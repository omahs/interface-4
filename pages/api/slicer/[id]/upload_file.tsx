import fetcher from "@utils/fetcher"
import type { NextApiRequest, NextApiResponse } from "next"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query

  const { buffer, fileExt } = JSON.parse(req.body)
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_KEY
  const supabaseStorage = "test"

  try {
    if (req.method === "POST" || req.method === "PUT") {
      const buf = Buffer.from(buffer, "binary")
      const size = buf.length

      const body = {
        method: req.method,
        headers: {
          authorization: `Bearer ${supabaseKey}`,
          "Content-Type": `image/${fileExt}`,
          "Content-Length": size,
        },
        body: buf,
      }
      const response = await fetcher(
        `${supabaseUrl}/storage/v1/object/${supabaseStorage}/slicer_${id}_main`,
        body
      )

      // Log if error
      // const { error: uploadError } = await supabase.storage ...
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
