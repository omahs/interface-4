import type { NextApiRequest, NextApiResponse } from "next"
import { CreateProduct, UpdateProduct } from "@lib/handlers/prisma"
import prisma from "@lib/prisma"
import corsMiddleware from "@utils/corsMiddleware"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await corsMiddleware(req, res)
  const { id, productId, pending } = req.query
  let data: any

  try {
    if (req.method === "GET") {
      const getProductsBody =
        pending == "true"
          ? {
              AND: [
                {
                  slicerId: { equals: Number(id) }
                },
                {
                  productId: { equals: null }
                },
                {
                  createdAt: {
                    lte: new Date(Date.now() - 1000 * 60 * 60)
                  }
                }
              ]
            }
          : {
              slicerId: { equals: Number(id) }
            }

      data = await prisma.product.findMany({
        where: getProductsBody,
        select: {
          id: true,
          productId: true,
          name: true,
          shortDescription: true,
          description: true,
          creator: true,
          uid: true,
          hash: true,
          image: true,
          purchaseInfo: true,
          texts: true
        }
      })
      // else {
      //   data = await prisma.product.count({
      //     where: {
      //       AND: [
      //         {
      //           slicerId: { equals: Number(id) },
      //         },
      //         {
      //           name: { equals: String(name) },
      //         },
      //       ],
      //     },
      //   })
      // }
    }

    if (req.method === "POST") {
      const {
        name,
        productId,
        shortDescription,
        description,
        image,
        creator,
        uid,
        hash,
        tempProductHash,
        purchaseInfo,
        texts
      } = JSON.parse(req.body)
      const pid = productId ? Number(productId) : null
      data = await CreateProduct(
        Number(id),
        name,
        shortDescription,
        description,
        creator,
        uid,
        hash,
        tempProductHash,
        image,
        pid,
        purchaseInfo,
        texts
      )
    }

    if (req.method === "PUT") {
      const { id, tempProductHash, productId } = JSON.parse(req.body)
      data = await UpdateProduct(Number(id), tempProductHash, Number(productId))
    }

    if (req.method === "DELETE") {
      data = await prisma.product.delete({
        where: { id: Number(productId) }
      })
    }

    res.status(200).json({ data })
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export default handler
