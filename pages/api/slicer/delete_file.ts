import type { NextApiRequest, NextApiResponse } from "next"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.BACKEND_SUPABASE_KEY
const supabaseStorage = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_NAME
const supabase = createClient(supabaseUrl, supabaseKey)

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { url } = JSON.parse(req.body)

  try {
    if (req.method === "POST") {
      const { data, error } = await supabase.storage
        .from(supabaseStorage)
        .remove([url, `${url}_blur`])

      console.log(data)
      if (error) {
        throw Error(error.message)
      }

      res.status(200).json({ data })
    }
  } catch (err) {
    throw err
  }
}

export default handler
