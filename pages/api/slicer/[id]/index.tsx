import type { NextApiRequest, NextApiResponse } from "next"
import { slice, sliceCore } from "@lib/initProvider"
import { ethers } from "ethers"
import { Slicer } from "@prisma/client"
import prisma from "@lib/db"

type Data = {
  slicerInfo: Slicer
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  const provider = ethers.getDefaultProvider(process.env.NETWORK_URL)
  const slicerExists: boolean = await sliceCore(provider).exists(id)
  let slicerInfo: Slicer

  if (slicerExists) {
    slicerInfo = await prisma.slicer.findFirst({ where: { id: Number(id) } })
    if (slicerInfo == null) {
      slicerInfo = {
        id: Number(id),
        name: "Temporary",
        description: "Temporary",
        image: "",
        address: "Temporary",
      }
      await prisma.slicer.create({
        data: slicerInfo,
      })
    }
  } else {
    slicerInfo = {
      id: null,
      name: "Non-existent",
      description: "Non-existent",
      image: "Non-existent",
      address: "Non-existent",
    }
  }

  res.status(200).json({ slicerInfo })
}

export default handler
