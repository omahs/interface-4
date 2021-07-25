import type { NextApiRequest, NextApiResponse } from "next"
import { Slicer } from "@prisma/client"
import prisma from "@lib/db"

type Data = Slicer[]

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { items } = req.query
  if (req.method === "GET") {
    const SlicerList = await prisma.slicer.findMany({
      orderBy: { id: "asc" },
      take: Number(items),
    })
    res.status(200).json(SlicerList)
  }
}

export default handler
