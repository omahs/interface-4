import type { NextApiRequest, NextApiResponse } from "next"
import { sliceCore } from "@lib/initProvider"
import { Slicer } from "@prisma/client"
import prisma from "@lib/db"
import { defaultProvider } from "lib/useProvider"
import { TotalReceived } from "@lib/handlers/chain"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, stats } = req.query

  try {
    if (req.method === "GET") {
      const slicerExists: boolean = await sliceCore(defaultProvider).exists(id)
      let totalReceived: number
      let slicerInfo: Slicer

      if (slicerExists) {
        if (stats !== "false") {
          const query = await TotalReceived(Number(id))
          totalReceived = Math.floor(Number(query[1]) / 0.975 / 10 ** 16) / 100
        }
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
            external_url: `https://slice.so/slicer/${slicerId}`,
            address: slicerAddress,
            image: "https://slice.so/slicer_default.png",
            attributes: [],
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
          external_url: "",
          address: "",
          image: "",
          attributes: [],
        }
      }
      if (totalReceived) {
        slicerInfo.attributes.push({
          display_type: "number",
          trait_type: "ETH Received",
          value: totalReceived,
        })
      }
      res.status(200).json(slicerInfo)
    }

    if (req.method === "POST") {
      const { name, description, imageUrl } = JSON.parse(req.body)

      const query = await prisma.slicer.update({
        where: { id: Number(id) },
        data: { name, description, image: imageUrl },
      })
      res.status(200).json({ query })
    }
  } catch (err) {
    throw err
  }
}

export default handler
