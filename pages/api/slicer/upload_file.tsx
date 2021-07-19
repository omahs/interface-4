import type { NextApiRequest, NextApiResponse } from "next"
import fetcher from "@utils/fetcher"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { buffer } = JSON.parse(req.body)
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_KEY
  const supabaseStorage = "test"

  // Todo: Set size limit
  // Todo: Set dynamic filePath
  // Todo: Set dynamic content-type
  try {
    if (req.method === "POST") {
      const buf = Buffer.from(buffer, "binary")
      const size = buf.length

      const body = {
        method: "POST",
        headers: {
          authorization: `Bearer ${supabaseKey}`,
          "Content-Type": `image/jpeg`,
          // "Content-Type": `image/${fileExt}`,
          "Content-Length": size,
        },
        body: buf,
      }
      const response = await fetcher(
        `${supabaseUrl}/storage/v1/object/${supabaseStorage}/123456`,
        // `${supabaseUrl}/storage/v1/object/test/${filePath}`,
        body
      )

      // let filePath: string
      // let file

      // form.parse(req, async (err, fields, files) => {
      // const fileExt = files.SlicerPic.name.split(".").pop()
      // const fileName = `${String(Math.random()).slice(2)}.${fileExt}`
      // file = files.SlicerPic
      // filePath = `${fileName}`
      // console.log(filePath)
      // console.log(file)

      // const test = await supabase.storage
      //   .from("test")
      //   .upload("asdasd", file)
      // const test = await supabase.storage.getBucket("test")
      // console.log(err, fields, files)
      // })

      // const { error: uploadError } = await supabase.storage
      //   .from("test")
      //   .upload(filePath, file)

      // if (uploadError) {
      //   throw uploadError
      // }
      res.status(200).json(response)
    }
  } catch (err) {
    throw err
  }
}

export default handler
