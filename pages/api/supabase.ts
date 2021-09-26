import { NextApiRequest, NextApiResponse } from "next"
import corsMiddleware from "@utils/corsMiddleware"

const supabase = async (req: NextApiRequest, res: NextApiResponse) => {
  await corsMiddleware(req, res)
  try {
    if (req.method === "GET") {
      const supabaseKey = process.env.ANON_SUPABASE_KEY
      res.status(200).json({ supabaseKey })
    }
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export default supabase
