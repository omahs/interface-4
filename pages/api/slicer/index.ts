import type { NextApiRequest, NextApiResponse } from "next"
import { SlicerReduced } from "@prisma/client"
import prisma from "@lib/db"

type Data = SlicerReduced[]

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { items } = req.query
  if (req.method === "GET") {
    const SlicerList = await prisma.slicer.findMany({
      orderBy: { id: "desc" },
      take: Number(items),
      select: { id: true, name: true, image: true },
    })
    res.status(200).json(SlicerList)
  }
}

export default handler
