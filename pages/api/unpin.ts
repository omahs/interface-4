import type { NextApiRequest, NextApiResponse } from "next"
import corsMiddleware from "@utils/corsMiddleware"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await corsMiddleware(req, res)
  const baseUrl = process.env.NEXT_PUBLIC_PINATA_URL
  try {
    if (req.method === "POST") {
      const { hash } = JSON.parse(req.body)
      const body = {
        headers: {
          Authorization: `Bearer ${process.env.PINATA_JWT}`,
        },
        method: "DELETE",
      }
      const cid = await fetch(`${baseUrl}/pinning/unpin/${hash}`, body)

      res.status(200).json({ cid })
    }
  } catch (err) {
    console.log(err)
  }
}

export default handler
