import { NextApiRequest, NextApiResponse } from "next"
import corsMiddleware from "@utils/corsMiddleware"

const webStorage = async (req: NextApiRequest, res: NextApiResponse) => {
  await corsMiddleware(req, res)
  try {
    if (req.method === "GET") {
      const webStorageKey = process.env.WEB3STORAGE_KEY
      res.status(200).json({ webStorageKey })
    }
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export default webStorage
