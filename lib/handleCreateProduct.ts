import { CID } from "multiformats/cid"
import supabaseUpload from "@utils/supabaseUpload"
import fetcher from "@utils/fetcher"
import { NewImage } from "pages/slicer/[id]"
import web3Storage from "./web3Storage"

export const beforeCreate = async (
  productId: number,
  slicerId: number,
  name: string,
  description: string,
  newImage: NewImage
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
  const pinBody = {
    body: JSON.stringify({ metadata, slicerId, productId }),
    method: "POST",
  }
  const { IpfsHash } = await fetcher("/api/pin_json", pinBody)

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

  // save purchaseData on web3Storage
  // Todo: send correct files from frontend
  const { webStorageKey } = await fetcher("/api/webStorage")
  const purchaseDataCID = await web3Storage(webStorageKey).put(
    [newImage.file],
    {
      maxRetries: 3,
    }
  )
  const purchaseDataHash = CID.parse(purchaseDataCID).bytes

  return {
    image,
    newProduct,
    dataHash: IpfsHash,
    purchaseDataCID,
    purchaseDataHash,
  }
}

export const handleReject = async (
  slicerId: number,
  image: string,
  hash: string,
  purchaseDataCID: string,
  productId: string
) => {
  const supabaseStorage = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_NAME
  // unpin
  if (hash) {
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
