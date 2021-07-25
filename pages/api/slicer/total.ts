import type { NextApiRequest, NextApiResponse } from "next"
import { slice } from "@lib/initProvider"
import { defaultProvider } from "lib/useProvider"

type Data = {
  totalSlicers: number
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method === "GET") {
    const totalSlicers = await slice(defaultProvider).totalTokens()
    res.status(200).json({ totalSlicers: Number(totalSlicers) })
  }
}

export default handler
