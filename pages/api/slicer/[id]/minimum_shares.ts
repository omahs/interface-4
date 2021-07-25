import type { NextApiRequest, NextApiResponse } from "next"
import { slicer } from "@lib/initProvider"
import { defaultProvider } from "lib/useProvider"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query

  try {
    if (req.method === "GET") {
      const slicerContract = await slicer(Number(id), defaultProvider)
      const minimumShares = await slicerContract.minimumShares()
      res.status(200).json(minimumShares)
    }
  } catch (err) {
    throw err
  }
}

export default handler
