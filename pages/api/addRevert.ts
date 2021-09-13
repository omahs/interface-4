import type { NextApiRequest, NextApiResponse } from "next"
import { AddRevert } from "@lib/handlers/prisma"
import corsMiddleware from "@utils/corsMiddleware"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await corsMiddleware(req, res)

  try {
    if (req.method === "POST") {
      const { purchaseDataCID } = JSON.parse(req.body)
      const data = await AddRevert(String(purchaseDataCID))
      res.status(200).json({ data })
    }
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export default handler
