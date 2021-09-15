import supabaseUpload from "@utils/supabaseUpload"
import fetcher from "@utils/fetcher"
import { NewImage } from "pages/slicer/[id]"
import web3Storage from "./web3Storage"
import { bytes32FromIpfsHash, ipfsHashFromBytes32 } from "@utils/convertBytes"
import { encryptFiles } from "@utils/crypto"

export const beforeCreate = async (
  author: string,
  slicerId: number,
  name: string,
  description: string,
  newImage: NewImage,
  purchaseFiles: File[]
) => {
  let image = ""
  let purchaseDataCID = ""

  // Save image on supabase
  if (newImage.url) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    {
      const { Key } = await supabaseUpload(
        `${slicerId}/products/${name}`,
        newImage
      )
      image = `${supabaseUrl}/storage/v1/object/public/${Key}`
    }
  }

  // Pin metadata on pinata
  const metadata = { name, description, image }
  const pinMetadataBody = {
    body: JSON.stringify({
      metadata,
      slicerId,
    }),
    method: "POST",
  }
  const { IpfsHash } = await fetcher("/api/pin_json", pinMetadataBody)
  const bytes32MetadataHash = bytes32FromIpfsHash(IpfsHash)

  // Save metadata, hash & imageUrl on prisma
  const body = {
    method: "POST",
    body: JSON.stringify({
      name: metadata.name,
      description: metadata.description,
      image,
      hash: IpfsHash,
    }),
  }
  const { data: newProduct } = await fetcher(
    `/api/slicer/${slicerId}/products`,
    body
  )

  // save purchaseFiles on web3Storage
  if (purchaseFiles.length != 0) {
    const { webStorageKey } = await fetcher("/api/webStorage")
    const keyBody = {
      method: "POST",
      body: JSON.stringify({
        slicerId,
        name,
        author,
      }),
    }
    const { password, salt, iv } = await fetcher("/api/keygen", keyBody)
    const encryptedFiles = await encryptFiles(
      password,
      Buffer.from(salt),
      new Uint8Array(iv),
      purchaseFiles
    )
    purchaseDataCID = await web3Storage(webStorageKey).put(encryptedFiles, {
      maxRetries: 3,
    })
  }

  // save purchaseDataCID on a pinata Json
  const purchaseMetadata = { files: purchaseDataCID }
  const pinPurchaseMetadataBody = {
    body: JSON.stringify({ metadata: purchaseMetadata }),
    method: "POST",
  }
  const { IpfsHash: metadataHash } = await fetcher(
    "/api/pin_json",
    pinPurchaseMetadataBody
  )
  const bytes32PurchaseMetadataHash = bytes32FromIpfsHash(metadataHash)

  return {
    image,
    newProduct,
    dataHash: bytes32MetadataHash,
    purchaseDataCID,
    purchaseDataHash: bytes32PurchaseMetadataHash,
  }
}

export const handleReject = async (
  slicerId: number,
  image: string,
  dataHash: string,
  purchaseDataHash: string,
  purchaseDataCID: string,
  productId: string
) => {
  const supabaseStorage = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_NAME
  // unpin
  if (dataHash) {
    const hash = ipfsHashFromBytes32(dataHash)
    const unpinBody = {
      body: JSON.stringify({ hash }),
      method: "POST",
    }
    await fetcher("/api/unpin", unpinBody)
  }
  if (purchaseDataHash) {
    const hash = ipfsHashFromBytes32(purchaseDataHash)
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
    const prismaBody = {
      method: "POST",
      body: JSON.stringify({
        purchaseDataCID,
      }),
    }
    await fetcher(`/api/addRevert`, prismaBody)
  }
}
