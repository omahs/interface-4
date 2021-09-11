import type { NextApiRequest, NextApiResponse } from "next"
import { slice } from "@lib/initProvider"
import { defaultProvider } from "lib/useProvider"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { address } = req.query
  const { slicerAddresses } = JSON.parse(req.body)
  try {
    if (req.method === "POST") {
      const unreleased = await slice(defaultProvider).unreleasedBatch(
        address,
        slicerAddresses
      )
      res.status(200).json(unreleased)
    }
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export default handler
