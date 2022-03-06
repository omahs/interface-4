import type { NextApiRequest, NextApiResponse } from "next"
import { createClient } from "@supabase/supabase-js"
import corsMiddleware from "@utils/corsMiddleware"
import getBlurImageUrl from "@utils/getBlurImageUrl"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.BACKEND_SUPABASE_KEY
const supabaseStorage = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_NAME
const supabase = createClient(supabaseUrl, supabaseKey)

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await corsMiddleware(req, res)
  const { url } = JSON.parse(req.body)
  try {
    if (req.method === "POST") {
      const blurImageUrl = getBlurImageUrl(url)

      const { data, error } = await supabase.storage
        .from(supabaseStorage)
        .remove([url, blurImageUrl])

      if (error) {
        throw Error(error.message)
      }

      res.status(200).json({ data })
    }
  } catch (err) {
    res.status(500).json(err.message)
  }
}

export default handler
