import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "@lib/prisma"
import { SlicerReduced } from "pages/slicer"
import corsMiddleware from "@utils/corsMiddleware"

type Data = SlicerReduced[]

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await corsMiddleware(req, res)
  try {
    if (req.method === "GET") {
      const SlicerList = await prisma.slicer.findMany({
        where: {
          OR: [{ tags: { not: "Private" } }, { tags: { equals: null } }]
        },
        orderBy: { id: "desc" },
        select: {
          id: true,
          name: true,
          tags: true,
          description: true,
          image: true,
          isImmutable: true
        }
      })
      res.status(200).json(SlicerList)
    }
  } catch (err) {
    res.status(500).json(err.message)
  }
}

export default handler

// Todo?: Fix cors for !origin? I can access this from anywhere
