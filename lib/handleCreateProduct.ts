import supabaseUpload from "@utils/supabaseUpload"
import fetcher from "@utils/fetcher"
import { NewImage } from "pages/slicer/[id]"
import web3Storage from "./web3Storage"
import { bytes32FromIpfsHash, ipfsHashFromBytes32 } from "@utils/convertBytes"
import { encryptFiles } from "@utils/crypto"

export const beforeCreate = async (
  productId: number,
  slicerId: number,
  name: string,
  description: string,
  newImage: NewImage,
  purchaseFiles: File[]
) => {
  let image = ""
  if (!productId) {
    throw Error("An unexpected error occurred. Try again")
  }

  // Save image on supabase
  if (newImage.url) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    {
      const { Key } = await supabaseUpload(
        `${slicerId}/products/${productId}/main`,
        newImage
      )
      image = `${supabaseUrl}/storage/v1/object/public/${Key}`
    }
  }

  // Pin metadata on pinata
  const metadata = { name, description, image }
  const pinMetadataBody = {
    body: JSON.stringify({ metadata, slicerId, productId }),
    method: "POST",
  }
  const { IpfsHash } = await fetcher("/api/pin_json", pinMetadataBody)
  const bytes32MetadataHash = bytes32FromIpfsHash(IpfsHash)

  // Save metadata, hash & imageUrl on prisma
  const body = {
    method: "POST",
    body: JSON.stringify({
      productId,
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
  const { webStorageKey } = await fetcher("/api/webStorage")
  const encryptedFiles = await encryptFiles(
    `${productId}${slicerId}`,
    purchaseFiles
  )
  const purchaseDataCID = await web3Storage(webStorageKey).put(encryptedFiles, {
    maxRetries: 3,
  })

  // Todo: Save purchaseDataCID on a pinata Json
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
  const prismaBody = {
    method: "POST",
    body: JSON.stringify({
      purchaseDataCID,
    }),
  }
  await fetcher(`/api/addRevert`, prismaBody)
}
