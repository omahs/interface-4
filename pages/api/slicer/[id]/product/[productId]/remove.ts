import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "@lib/prisma"
import fetcher from "@utils/fetcher"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "DELETE") {
      const { id, productId } = req.query
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL

      const { id: pid } = await prisma.product.findFirst({
        where: { slicerId: Number(id), productId: Number(productId) },
        select: { id: true }
      })

      await prisma.product.update({
        where: { id: pid },
        data: {
          isRemoved: true
        }
      })

      // On-demand ISR
      const pathToRevalidate = `slicer/${id}`
      await fetcher(
        `${baseUrl}/api/revalidate?secret=${process.env.SECRET_REVALIDATE_TOKEN}&path=${pathToRevalidate}`
      )
      res.status(200).send({ message: "Product removed" })
    }
  } catch (err) {
    console.log(err)

    res.status(500).send(err.message)
  }
}

export default handler
