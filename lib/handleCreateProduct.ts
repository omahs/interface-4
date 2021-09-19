import { Dispatch, SetStateAction } from "react"
import { CID } from "multiformats/cid"
import supabaseUpload from "@utils/supabaseUpload"
import fetcher from "@utils/fetcher"
import { NewImage } from "pages/slicer/[id]"
import web3Storage from "./web3Storage"
import { encryptFiles, importKey } from "@utils/crypto"
import { LogDescription } from "@ethersproject/abi"
import getLog from "@utils/getLog"
import { base16 } from "multiformats/bases/base16"
import client from "@utils/apollo-client"
import { gql } from "@apollo/client"
import { mutate } from "swr"

export const beforeCreate = async (
  creator: string,
  slicerId: number,
  name: string,
  description: string,
  newImage: NewImage,
  purchaseFiles: File[],
  thankMessage: string,
  instructions: string,
  notes: string,
  setUploadStep: Dispatch<SetStateAction<number>>,
  setUploadPct: Dispatch<SetStateAction<number>>
) => {
  const uid = Math.random().toString().substring(2)
  const metadata = { name, description, creator, uid }
  let image = ""

  // Save image on supabase
  setUploadStep(1)
  if (newImage.url) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    {
      const { Key } = await supabaseUpload(
        `${slicerId}/products/${name}`,
        newImage
      )
      image = `${supabaseUrl}/storage/v1/object/public/${Key}`
      metadata["image"] = image
    }
  }

  // Pin metadata on pinata
  setUploadStep(2)
  const pinMetadataBody = {
    body: JSON.stringify({
      metadata,
      slicerId,
    }),
    method: "POST",
  }
  const { IpfsHash } = await fetcher("/api/pin_json", pinMetadataBody)
  const data = CID.parse(IpfsHash).bytes

  // encrypt files
  setUploadStep(3)
  const texts = [
    { value: thankMessage, filename: "Thanks" },
    { value: instructions, filename: "Instructions" },
    { value: notes, filename: "Notes" },
  ]
  const keygenBody = {
    method: "POST",
    body: JSON.stringify({
      slicerId,
      name,
      creator,
      uid,
    }),
  }
  const { exportedKey, iv } = await fetcher("/api/keygen", keygenBody)
  const key = await importKey(exportedKey)
  const encryptedFiles = await encryptFiles(
    key,
    new Uint8Array(iv),
    purchaseFiles,
    texts
  )

  // save purchaseFiles on web3Storage
  setUploadStep(4)
  const { webStorageKey } = await fetcher("/api/webStorage")
  const totalSize = encryptedFiles.map((f) => f.size).reduce((a, b) => a + b, 0)
  let uploaded = 0
  const onStoredChunk = (size: number) => {
    uploaded += size
    setUploadPct((uploaded * 100) / totalSize)
  }
  const purchaseDataCID = await web3Storage(webStorageKey).put(encryptedFiles, {
    maxRetries: 3,
    onStoredChunk,
  })
  const purchaseData = CID.parse(purchaseDataCID).bytes

  // Save metadata, hashes & imageUrl on prisma
  setUploadStep(5)
  const body = {
    method: "POST",
    body: JSON.stringify({
      name: metadata.name,
      description: metadata.description,
      image,
      creator,
      uid,
      hash: IpfsHash,
      tempProductHash: purchaseDataCID,
      productId: null,
    }),
  }
  const { data: newProduct } = await fetcher(
    `/api/slicer/${slicerId}/products`,
    body
  )

  setUploadStep(6)
  return {
    image,
    newProduct,
    data,
    purchaseData,
    purchaseDataCID,
  }
}

export const handleSuccess = async (
  slicerId: number,
  id: string,
  eventLogs: LogDescription[]
) => {
  const eventLog = getLog(eventLogs, "ProductAdded")
  // const eventLogs = [4, 0, BigNumber, false, false, true, 0, '0xAe009d532328FF09e09E5d506aB5BBeC3c25c0FF', '0x01551220aecc2b6190c7c7183a7bbcccf89f9ca60e8a2def4fbc11abb813f95e2fbbdf45', Array(0), Array(0)]
  const productId = eventLog[0]

  // Update product in prisma, adding productId and removing productHash
  const putBody = {
    method: "PUT",
    body: JSON.stringify({
      id,
      productId,
      tempProductHash: null,
    }),
  }
  await fetcher(`/api/slicer/${slicerId}/products`, putBody)
}

export const handleReject = async (
  slicerId: number,
  image: string,
  dataHash: Uint8Array | string,
  purchaseDataCID: string,
  productId: string
) => {
  const supabaseStorage = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_NAME
  // unpin
  if (dataHash) {
    let hash = dataHash
    if (typeof dataHash != "string") {
      hash = CID.decode(dataHash).toString()
    }
    const unpinBody = {
      body: JSON.stringify({ hash }),
      method: "POST",
    }
    await fetcher("/api/unpin", unpinBody)
  }

  // delete image from supabase
  if (image) {
    const currentImageName = image.split(`${supabaseStorage}/`).pop()
    const body = {
      method: "POST",
      body: JSON.stringify({
        url: currentImageName,
      }),
    }
    await fetcher(`/api/slicer/delete_file`, body)
  }

  // delete from prisma
  const body = {
    method: "DELETE",
  }
  await fetcher(`/api/slicer/${slicerId}/products?productId=${productId}`, body)

  // add web3Storage hash in Reject table on prisma
  if (purchaseDataCID) {
    const revertBody = {
      method: "POST",
      body: JSON.stringify({
        purchaseDataCID,
      }),
    }
    await fetcher(`/api/addRevert`, revertBody)
  }
}

export const handleCleanup = async (
  slicerId: number,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  setLoading(true)

  // Get all pending products and loop through them
  const { data: products } = await fetcher(
    `/api/slicer/${slicerId}/products?pending=true`
  )

  for (let i = 0; i < products.length; i++) {
    const product = products[i]
    const dataHash =
      "0x" + CID.parse(product.hash)?.toString(base16).substring(1)

    // // Distinguish between minted / not minted product
    const tokensQuery = /* GraphQL */ `
      products(where: {
        slicer: "${slicerId}",
        creator: "${product.creator.toLowerCase()}",
        data: "${dataHash}"
      }) {
        id
      }
    `
    const { data } = await client.query({
      query: gql`
      query {
        ${tokensQuery}
      }
    `,
    })

    if (data.products.length != 0 /* minted */) {
      // Update productId and remove hash
      const productId = data.products[0].id.split("-").pop()
      const putBody = {
        method: "PUT",
        body: JSON.stringify({
          id: product.id,
          productId: productId,
          tempProductHash: null,
        }),
      }
      await fetcher(`/api/slicer/${slicerId}/products`, putBody)
    } /* not minted */ else {
      await handleReject(
        slicerId,
        product.image,
        product.hash,
        product.tempProductHash,
        product.id
      )
    }
  }

  await reload(slicerId, setLoading)
}

export const reload = async (
  slicerId: number,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  setLoading(true)

  // Get all missing minted products on prisma
  const { data: products } = await fetcher(`/api/slicer/${slicerId}/products`)

  const tokensQuery = /* GraphQL */ `
  products (where: {slicer: "${slicerId}"}) {
    id
    data
  }
`
  const { data } = await client.query({
    query: gql`
      query {
        ${tokensQuery}
      }
    `,
  })
  const blockchainProducts = data.products

  const productIds = Array.from(
    { length: blockchainProducts.length },
    (_, i) => i + 1
  )

  for (let i = 0; i < productIds.length; i++) {
    const productId = productIds[i]

    if (products.filter((p) => p.productId === productId).length == 0) {
      const hash = "f" + blockchainProducts[i].data.substring(2)
      const dataHash = CID.parse(hash, base16.decoder).toV1().toString()
      const { name, description, creator, image, uid } = await fetcher(
        `https://gateway.pinata.cloud/ipfs/${dataHash}`
      )
      const body = {
        method: "POST",
        body: JSON.stringify({
          name,
          productId,
          description,
          image,
          creator,
          uid: uid || "",
          tempProductHash: null,
          hash: dataHash,
        }),
      }
      await fetcher(`/api/slicer/${slicerId}/products`, body)
    }
  }
  mutate(`/api/slicer/${slicerId}/products`)
  setLoading(false)
}
