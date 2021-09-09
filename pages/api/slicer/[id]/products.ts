import type { NextApiRequest, NextApiResponse } from "next"
import { CreateProduct } from "@lib/handlers/prisma"
import prisma from "@lib/db"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, productId } = req.query
  let data: any

  try {
    if (req.method === "POST") {
      const { productId, name, description, image, hash } = JSON.parse(req.body)
      data = await CreateProduct(
        productId,
        Number(id),
        name,
        description,
        hash,
        image
      )
    }

    if (req.method === "DELETE") {
      data = await prisma.product.delete({
        where: { id: Number(productId) },
      })
    }

    res.status(200).json({ data })
  } catch (err) {
    throw err
  }
}

export default handler
