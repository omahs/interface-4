import type { NextApiRequest, NextApiResponse } from "next"
import corsMiddleware from "@utils/corsMiddleware"
import { generateKey } from "@utils/crypto"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await corsMiddleware(req, res)
  try {
    if (req.method === "POST") {
      const { slicerId, name, creator, uid } = JSON.parse(req.body)
      const enKey = process.env.ENCRYPT_KEY

      const password = `s${slicerId}-nm${name.substring(3)}k${enKey}`
      const salt = `${creator.substring(3)}__${uid}`
      const iv = [
        5,
        254,
        31,
        Number(slicerId),
        63,
        77,
        Number(uid),
        175,
        153,
        129,
        222,
        47,
      ]

      const exportedKey = await generateKey(password, salt)

      res.status(200).json({ exportedKey, iv })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
}

export default handler

// Todo: Figure out how to make key generation safer (anyone could make requests to this endpoint)
// Todo: Evaluate to make it private for added security?
