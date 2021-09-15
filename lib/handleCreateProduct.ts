import { Dispatch, SetStateAction } from "react"
import { CID } from "multiformats/cid"
import supabaseUpload from "@utils/supabaseUpload"
import fetcher from "@utils/fetcher"
import { NewImage } from "pages/slicer/[id]"
import web3Storage from "./web3Storage"
import { encryptFiles } from "@utils/crypto"

export const beforeCreate = async (
  author: string,
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
  let image = ""

  setUploadStep(1)
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
  setUploadStep(2)
  const metadata = { name, description, image }
  const pinMetadataBody = {
    body: JSON.stringify({
      metadata,
      slicerId,
    }),
    method: "POST",
  }
  const { IpfsHash } = await fetcher("/api/pin_json", pinMetadataBody)
  const data = CID.parse(IpfsHash).bytes

  // Save metadata, hash & imageUrl on prisma
  setUploadStep(3)
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

  // encrypt files
  setUploadStep(4)
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
  const texts = [
    { value: thankMessage, filename: "Thanks" },
    { value: instructions, filename: "Instructions" },
    { value: notes, filename: "Notes" },
  ]
  const encryptedFiles = await encryptFiles(
    password,
    Buffer.from(salt),
    new Uint8Array(iv),
    purchaseFiles,
    texts
  )

  // save purchaseFiles on web3Storage
  setUploadStep(5)
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

  setUploadStep(6)
  return {
    image,
    newProduct,
    data,
    purchaseData,
    purchaseDataCID,
  }
}

export const handleReject = async (
  slicerId: number,
  image: string,
  dataHash: Uint8Array,
  purchaseDataCID: string,
  productId: string,
  setUploadStep: Dispatch<SetStateAction<number>>
) => {
  setUploadStep(7)
  const supabaseStorage = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_NAME
  // unpin
  if (dataHash) {
    const hash = CID.decode(dataHash).toString()
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
  setUploadStep(8)
}
