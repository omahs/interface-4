import fs from "fs"
import fetcher from "@utils/fetcher"
const sharp = require("sharp")
import type { NextApiRequest, NextApiResponse } from "next"

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "20mb",
    },
  },
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query
  const { buffer, fileExt } = JSON.parse(req.body)

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_KEY
  const supabaseStorage = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_NAME
  const fileName = `slicer_${id}_main`

  const imageBody = (buf: Buffer | File) => ({
    method: req.method,
    headers: {
      authorization: `Bearer ${supabaseKey}`,
      "Content-Type": `image/${fileExt}`,
    },
    body: buf,
  })

  try {
    if (req.method === "POST" || req.method === "PUT") {
      const buf = Buffer.from(buffer, "latin1")

      if (fileExt === "gif") {
        await sharp(buf, { animated: true })
          // .resize({ width: 800, withoutEnlargement: true })
          // .gif({ pageHeight: 460 })
          .toFile(`${fileName}.webp`)
      } else {
        await sharp(buf)
          .resize({ width: 800, withoutEnlargement: true })
          .toFile(`${fileName}.webp`)
      }
      await sharp(buf).resize(64).toFile(`${fileName}_blur.webp`)

      const file = fs.readFileSync(`${fileName}.webp`)
      const fileBlur = fs.readFileSync(`${fileName}_blur.webp`)

      const { Key } = await fetcher(
        `${supabaseUrl}/storage/v1/object/${supabaseStorage}/${fileName}`,
        imageBody(file)
      )
      await fetcher(
        `${supabaseUrl}/storage/v1/object/${supabaseStorage}/${fileName}_blur`,
        imageBody(fileBlur)
      )

      fs.unlinkSync(`${fileName}.webp`)
      fs.unlinkSync(`${fileName}_blur.webp`)

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
