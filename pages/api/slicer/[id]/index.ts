import type { NextApiRequest, NextApiResponse } from "next"
import { sliceCore } from "@lib/initProvider"
import { Slicer } from "@prisma/client"
import prisma from "@lib/db"
import { defaultProvider } from "lib/useProvider"
import { TotalReceived } from "@lib/handlers/chain"
import client from "@utils/apollo-client"
import { gql } from "@apollo/client"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, stats } = req.query

  try {
    if (req.method === "GET") {
      const slicerExists: boolean = await sliceCore(defaultProvider).exists(id)
      let totalReceived = 0
      let slicerInfo: Slicer

      if (slicerExists) {
        slicerInfo = await prisma.slicer.findFirst({
          where: { id: Number(id) },
        })
        if (slicerInfo == null) {
          const { data } = await client.query({
            query: gql`
              query Slicers {
                slicer(id: "${id}") {
                  address
                  slices
                  minimumSlices
                  isCollectible
                  creator{
                    id
                  }
                  createdAtTimestamp
                }
              }
            `,
          })
          const creatorAddress = data.slicer.creator.id
          const creatorAddressFormatted = creatorAddress.replace(
            creatorAddress.substring(5, creatorAddress.length - 3),
            "___"
          )

          slicerInfo = {
            id: Number(id),
            name: `Slicer #${id}`,
            description: "",
            external_url: `https://slice.so/slicer/${id}`,
            address: data.slicer.address,
            image: "https://slice.so/slicer_default.png",
            isCollectible: data.slicer.isCollectible,
            attributes: [
              {
                display_type: "number",
                trait_type: "Total slices",
                value: data.slicer.slices,
              },
              {
                display_type: "number",
                trait_type: "Minimum slices",
                value: data.slicer.minimumSlices,
              },
              {
                trait_type: "Creator",
                value: creatorAddress,
                // value: creatorAddressFormatted,
              },
              {
                display_type: "date",
                trait_type: "Sliced on",
                value: data.slicer.createdAtTimestamp,
              },
            ],
          }
          await prisma.slicer.create({
            data: slicerInfo,
          })
        }
        if (stats !== "false") {
          const query = await TotalReceived(Number(id))
          if (Number(query[1]) != 0) {
            totalReceived =
              Math.floor(Number(query[1]) / 0.975 / 10 ** 16) / 100
          }
          slicerInfo.attributes.push({
            display_type: "number",
            trait_type: "ETH Received",
            value: totalReceived,
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
          isCollectible: false,
          attributes: [],
        }
      }
      res.status(200).json(slicerInfo)
    }

    if (req.method === "POST") {
      const { name, description, imageUrl } = JSON.parse(req.body)

      const slicerInfo = await prisma.slicer.findFirst({
        where: { id: Number(id) },
        select: {
          isCollectible: true,
          id: true,
          name: true,
          description: true,
          image: true,
        },
      })

      if (
        slicerInfo.isCollectible &&
        (slicerInfo.name !== `Slicer #${id}` ||
          slicerInfo.description !== "" ||
          slicerInfo.image !== "https://slice.so/slicer_default.png")
      ) {
        throw Error("Collectible asset already set")
      }

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
