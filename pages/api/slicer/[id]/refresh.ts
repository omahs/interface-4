import type { NextApiRequest, NextApiResponse } from "next"
import fetcher from "@utils/fetcher"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL

  try {
    if (req.method === "GET") {
      const query = await fetcher(
        `${baseUrl}/api/revalidate?secret=${process.env.SECRET_REVALIDATE_TOKEN}&path=slicer/${id}`
      )
      res.status(200).json({ query })
    }
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export default handler
