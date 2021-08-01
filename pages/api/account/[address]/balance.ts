import type { NextApiRequest, NextApiResponse } from "next"
import { slc } from "@lib/initProvider"
import { defaultProvider } from "lib/useProvider"

type Data = {
  balance: number
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { address } = req.query
  if (req.method === "GET") {
    const balance = await slc(defaultProvider).balanceOf(address)
    res.status(200).json({ balance })
  }
}

export default handler
