import type { NextApiRequest, NextApiResponse } from "next"
import { sliceCore } from "@lib/initProvider"
import { ethers } from "ethers"
import { Slicer } from "@prisma/client"
import prisma from "@lib/db"

type Data = {
  slicerInfo: Slicer
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query
  const provider = ethers.getDefaultProvider(process.env.NETWORK_URL)
  const slicerExists: boolean = await sliceCore(provider).exists(id)
  let slicerInfo: Slicer

  if (slicerExists) {
    slicerInfo = await prisma.slicer.findFirst({ where: { id: Number(id) } })
    if (slicerInfo == null) {
      const slicerAddress: string = await sliceCore(provider).slicers(id)
      slicerInfo = {
        id: Number(id),
        name: "Temporary name",
        description: "Temporary description for a nice slicer",
        address: slicerAddress,
        imageUrl: "",
      }
      await prisma.slicer.create({
        data: slicerInfo,
      })
    }
  } else {
    slicerInfo = {
      id: null,
      name: "",
      description: "",
      address: "",
      imageUrl: "",
    }
  }

  res.status(200).json({ slicerInfo })
}

export default handler
