import type { NextApiRequest, NextApiResponse } from "next"
import fetcher from "@utils/fetcher"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
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
      const { IpfsHash } = await fetcher(
        `${baseUrl}/pinning/unpin/${hash}`,
        body
      )

      res.status(200).json(IpfsHash)
    }
  } catch (err) {
    res.status(500).json(err)
  }
}

export default handler
