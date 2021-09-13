import type { NextApiRequest, NextApiResponse } from "next"
import fetcher from "@utils/fetcher"
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
          "Content-Type": "application/json",
        },
        method: "DELETE",
      }
      const cid = await fetcher(`${baseUrl}/pinning/unpin/${hash}`, body)

      res.status(200).json({ cid })
    }
  } catch (err) {
    res.status(200).json({ status: "deleted" })
    console.log(err)
  }
}

export default handler
