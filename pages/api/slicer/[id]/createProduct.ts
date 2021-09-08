import type { NextApiRequest, NextApiResponse } from "next"
import { CreateProduct } from "@lib/handlers/prisma"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query
  const { productId, name, description, image } = JSON.parse(req.body)

  try {
    if (req.method === "POST") {
      const data = await CreateProduct(
        productId,
        Number(id),
        name,
        description,
        image
      )

      res.status(200).json({ data })
    }
  } catch (err) {
    throw err
  }
}

export default handler
