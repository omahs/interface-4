import type { NextApiRequest, NextApiResponse } from "next"
import corsMiddleware from "@utils/corsMiddleware"
import { generateKey } from "@utils/crypto"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await corsMiddleware(req, res)
  try {
    if (req.method === "POST") {
      const { slicerId, name, author } = JSON.parse(req.body)

      // const enKey = process.env.ENCRYPT_KEY // TBD
      const password = `${slicerId}${name}`
      const salt = Buffer.from(author)
      const iv = [1, 0, 1]

      const key = await generateKey(password, salt)
      const exportedKey = await crypto.subtle.exportKey("jwk", key)

      // choosing a unique initialization vector for every encryption performed with the same key
      res.status(200).json({ exportedKey, iv })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
}

export default handler

// Todo: Figure out pass values
