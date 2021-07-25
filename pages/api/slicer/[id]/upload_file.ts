import fetcher from "@utils/fetcher"
const sharp = require("sharp")
import type { NextApiRequest, NextApiResponse } from "next"

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query
  console.log(JSON.parse(req.body))
  const { buffer, fileExt } = JSON.parse(req.body)
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_KEY
  const supabaseStorage = "dev"

  const imageBody = (buf: Buffer) => ({
    method: req.method,
    headers: {
      authorization: `Bearer ${supabaseKey}`,
      "Content-Type": `image/${fileExt}`,
    },
    body: buf,
  })

  try {
    if (req.method === "POST" || req.method === "PUT") {
      const buf = Buffer.from(buffer, "binary")

      const image = await sharp(buf)
        .resize({ width: 800, withoutEnlargement: true })
        .toBuffer(`slicer_${id}_main.${fileExt}`)

      const { Key } = await fetcher(
        `${supabaseUrl}/storage/v1/object/${supabaseStorage}/slicer_${id}_main`,
        imageBody(image)
      )

      const imageRed = await sharp(buf)
        .resize(6)
        .toBuffer(`slicer_${id}_main_blur.${fileExt}`)

      await fetcher(
        `${supabaseUrl}/storage/v1/object/${supabaseStorage}/slicer_${id}_main_blur`,
        imageBody(imageRed)
      )

      // Log if error
      // const { error: uploadError } = await supabase.storage ...
      // if (uploadError) {
      //   throw uploadError
      // }

      res.status(200).json({ Key })
    }
  } catch (err) {
    throw err
  }
}

export default handler
