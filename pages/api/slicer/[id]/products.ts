import type { NextApiRequest, NextApiResponse } from "next"
import { CreateProduct } from "@lib/handlers/prisma"
import prisma from "@lib/db"
import corsMiddleware from "@utils/corsMiddleware"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await corsMiddleware(req, res)
  const { id, productId } = req.query
  let data: any

  try {
    if (req.method === "POST") {
      const { name, description, image, hash } = JSON.parse(req.body)
      data = await CreateProduct(Number(id), name, description, hash, image)
    }

    if (req.method === "DELETE") {
      data = await prisma.product.delete({
        where: { id: Number(productId) },
      })
    }

    res.status(200).json({ data })
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export default handler
