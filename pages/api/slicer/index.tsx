import type { NextApiRequest, NextApiResponse } from "next"
import { slice } from "@lib/initProvider"
import { ethers } from "ethers"

type Data = {
  totalSlicers: number
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const provider = ethers.getDefaultProvider(process.env.NETWORK_URL)
  const totalSlicers = await slice(provider).totalTokens()
  res.status(200).json({ totalSlicers: Number(totalSlicers) })
}

export default handler
