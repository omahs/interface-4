import type { NextApiRequest, NextApiResponse } from "next"
import fetcher from "@utils/fetcher"
import corsMiddleware from "@utils/corsMiddleware"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await corsMiddleware(req, res)
  const { metadata, slicerId } = JSON.parse(req.body)
  const baseUrl = process.env.NEXT_PUBLIC_PINATA_URL
  try {
    if (req.method === "POST") {
      const body = {
        headers: {
          Authorization: `Bearer ${process.env.PINATA_JWT}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pinataOptions: { cidVersion: "1" },
          pinataMetadata: {
            name: metadata.name,
            keyvalues: { slicerId },
          },
          pinataContent: metadata,
        }),
        method: "POST",
      }
      const { IpfsHash } = await fetcher(
        `${baseUrl}/pinning/pinJSONToIPFS`,
        body
      )

      res.status(200).json({ IpfsHash })
    }
  } catch (err) {
    res.status(500).json(err.message)
  }
}

export default handler
