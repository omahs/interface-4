import type { NextApiRequest, NextApiResponse } from "next"
import { sliceCore } from "@lib/initProvider"
import { Slicer } from "@prisma/client"
import prisma from "@lib/db"
import { defaultProvider } from "lib/useProvider"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query

  try {
    if (req.method === "GET") {
      const slicerExists: boolean = await sliceCore(defaultProvider).exists(id)
      let slicerInfo: Slicer

      if (slicerExists) {
        slicerInfo = await prisma.slicer.findFirst({
          where: { id: Number(id) },
        })
        if (slicerInfo == null) {
          const slicerId = Number(id)
          const slicerAddress: string = await sliceCore(
            defaultProvider
          ).slicers(id)
          slicerInfo = {
            id: slicerId,
            name: `Slicer #${slicerId}`,
            description: "",
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

      res.status(200).json(slicerInfo)
    }

    if (req.method === "POST") {
      const { name, description, imageUrl } = JSON.parse(req.body)

      const query = await prisma.slicer.update({
        where: { id: Number(id) },
        data: { name, description, imageUrl },
      })
      res.status(200).json({ query })
    }
  } catch (err) {
    throw err
  }
}

export default handler
