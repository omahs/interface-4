import type { NextApiRequest, NextApiResponse } from "next"
import { slice } from "@lib/initProvider"
import { defaultProvider } from "lib/useProvider"

type Data = {
  totalSlicers: number
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    if (req.method === "GET") {
      const totalSlicers = await slice(defaultProvider).totalTokens()
      res.status(200).json({ totalSlicers: Number(totalSlicers) })
    }
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export default handler
