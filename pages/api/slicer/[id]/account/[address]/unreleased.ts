import type { NextApiRequest, NextApiResponse } from "next"
import { slicer } from "@lib/initProvider"
import { defaultProvider } from "lib/useProvider"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, address } = req.query

  try {
    if (req.method === "GET") {
      const slicerContract = await slicer(Number(id), defaultProvider)
      const unreleased = await slicerContract.unreleased(address)
      res.status(200).json({ unreleased })
    }
  } catch (err) {
    throw err
  }
}

export default handler
