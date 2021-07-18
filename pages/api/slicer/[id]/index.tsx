import type { NextApiRequest, NextApiResponse } from "next"
import { sliceCore } from "@lib/initProvider"
import { ethers } from "ethers"
import { Slicer } from "@prisma/client"
import prisma from "@lib/db"
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query

  try {
    if (req.method === "GET") {
      const provider = ethers.getDefaultProvider(process.env.NETWORK_URL)
      const slicerExists: boolean = await sliceCore(provider).exists(id)
      let slicerInfo: Slicer

      if (slicerExists) {
        slicerInfo = await prisma.slicer.findFirst({
          where: { id: Number(id) },
        })
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

    if (req.method === "POST") {
      const { description } = JSON.parse(req.body)

      const query = await prisma.slicer.update({
        where: { id: Number(id) },
        data: { description },
      })
      res.status(200).json({ query })
    }
  } catch (err) {
    throw err
  }
}

export default handler
