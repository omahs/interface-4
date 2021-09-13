import { NewImage } from "pages/slicer/[id]"
import supabase from "lib/supabase"
import fetcher from "./fetcher"
const reduce = require("image-blob-reduce")()

const supabaseUpload = async (
  filename: string,
  newImage: NewImage,
  currentImageUrl = "",
  highQuality = false
) => {
  const supabaseStorage = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_NAME
  const { supabaseKey } = await fetcher("/api/supabase")
  const fileExt = newImage.file.name.split(".").pop()
  const randomString = Math.random().toString(36).slice(4)
  filename += `_${randomString}`

  let mainImage: File
  if (fileExt !== "gif") {
    if (highQuality) {
      mainImage = await reduce.toBlob(newImage.file, { max: 1980 })
    } else {
      mainImage = await reduce.toBlob(newImage.file, { max: 1280 })
    }
  } else {
    // Todo: Compress gif before upload
    mainImage = newImage.file
  }
  const { data, error } = await supabase(supabaseKey)
    .storage.from(supabaseStorage)
    .upload(filename, mainImage, {
      cacheControl: "3600",
      upsert: false,
    })
  if (error) {
    throw Error(error.message)
  }

  const blurredImage = await reduce.toBlob(newImage.file, { max: 4 })
  await supabase(supabaseKey)
    .storage.from(supabaseStorage)
    .upload(`${filename}_blur`, blurredImage, {
      cacheControl: "3600",
      upsert: false,
    })

  if (
    currentImageUrl &&
    currentImageUrl !== "https://slice.so/slicer_default.png"
  ) {
    const currentImageName = currentImageUrl.split(`${supabaseStorage}/`).pop()
    const body = {
      method: "POST",
      body: JSON.stringify({
        url: currentImageName,
      }),
    }
    await fetcher(`/api/slicer/delete_file`, body)
  }
  return data
}

export default supabaseUpload
