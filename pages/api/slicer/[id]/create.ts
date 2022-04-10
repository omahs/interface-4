import type { NextApiRequest, NextApiResponse } from "next"
import { sliceCore } from "@lib/initProvider"
import { Slicer } from "@prisma/client"
import prisma from "@lib/prisma"
import { defaultProvider } from "lib/useProvider"
import { domain } from "@components/common/Head"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      const { id } = req.query
      const {
        slicerAddress,
        isImmutable,
        totalShares,
        minimumShares,
        creator
      } = JSON.parse(req.body)

      // Endpoint assumes passed id is hex
      const decimalId = parseInt(String(id), 16)

      const slicerExists: boolean = await sliceCore(defaultProvider).exists(
        decimalId
      )
      let slicerInfo: Slicer

      if (slicerExists) {
        slicerInfo = await prisma.slicer.findFirst({
          where: { id: Number(decimalId) }
        })
        if (slicerInfo == null) {
          slicerInfo = {
            id: Number(decimalId),
            name: `Slicer #${decimalId}`,
            description: "",
            tags: "",
            external_url: `${domain}/slicer/${decimalId}`,
            address: slicerAddress,
            image: "https://slice.so/slicer_default.png",
            isImmutable: isImmutable,
            attributes: [
              {
                display_type: "number",
                trait_type: "Total slices",
                value: String(totalShares)
              },
              {
                display_type: "number",
                trait_type: "Superowner slices",
                value: String(minimumShares)
              },
              {
                trait_type: "Creator",
                value: creator
              }
            ],
            config: { sponsors: true },
            sponsors: {}
          }
          await prisma.slicer.create({
            data: slicerInfo
          })
        } else {
          res.status(500).json({ message: "Slicer already exists" })
        }
      } else {
        res.status(404).json({ message: "Slicer does not exist" })
      }
      res.status(200).json({ message: "Slicer created" })
    }
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export default handler
