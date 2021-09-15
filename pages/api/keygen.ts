import type { NextApiRequest, NextApiResponse } from "next"
import corsMiddleware from "@utils/corsMiddleware"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await corsMiddleware(req, res)
  try {
    if (req.method === "POST") {
      const { slicerId, name, author } = JSON.parse(req.body)

      const password = `${slicerId}${name}`
      const salt = author
      const iv = [1, 0, 1]

      res.status(200).json({ password, salt, iv })
    }
  } catch (err) {
    console.log(err)
  }
}

export default handler

// Todo: Figure out pass values
// Todo: Improve security of encryption process
