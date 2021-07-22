import type { NextApiRequest, NextApiResponse } from "next"
import { sliceCore } from "@lib/initProvider"
import { defaultProvider } from "lib/useProvider"

type Data = {
  totalOwned: number
  idsUint: number[]
  shares: number[]
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { address } = req.query
  if (req.method === "GET") {
    const [totalOwned, idsUint, shares] = await sliceCore(
      defaultProvider
    ).ownedSlicerShares(address)
    res.status(200).json({ totalOwned, idsUint, shares })
  }
}

export default handler
