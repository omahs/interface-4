import type { NextApiRequest, NextApiResponse } from "next"
import { sliceCore } from "@lib/initProvider"
import { Slicer } from "@prisma/client"
import prisma from "@lib/prisma"
import { defaultProvider } from "lib/useProvider"
import client from "@utils/apollo-client"
import { gql } from "@apollo/client"
import { domain } from "@components/common/Head"
import getEthFromWei from "@utils/getEthFromWei"
import { BigNumber, ethers, utils } from "ethers"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, stats } = req.query

  const hexId = utils.hexValue(BigNumber.from(parseInt(String(id), 16)))

  // Endpoint assumes passed id is hex
  const decimalId = parseInt(String(id), 16)

  try {
    if (req.method === "GET") {
      const slicerExists: boolean =
        (await sliceCore(defaultProvider).slicers(decimalId)) !=
        ethers.constants.AddressZero
      let slicerInfo: Slicer

      if (slicerExists) {
        slicerInfo = await prisma.slicer.findFirst({
          where: { id: Number(decimalId) },
          select: {
            id: true,
            name: true,
            description: true,
            external_url: true,
            address: true,
            image: true,
            tags: true,
            isImmutable: true,
            config: true,
            sponsors: true,
            attributes: true,
            slicerConfig: true
          }
        })
        if (slicerInfo == null) {
          const { data } = await client.query({
            query: gql`
              query Slicers {
                slicer(id: "${hexId}") {
                  address
                  slices
                  minimumSlices
                  isImmutable
                  controller{
                    id
                  }
                  creator{
                    id
                  }
                  createdAtTimestamp
                }
              }
            `
          })
          const creatorAddress = data.slicer.creator.id
          const controllerAddress = data.slicer.controller.id
          // const creatorAddressFormatted = creatorAddress.replace(
          //   creatorAddress.substring(5, creatorAddress.length - 3),
          //   "___"
          // )

          const attributes = [
            {
              display_type: "number",
              trait_type: "Total slices",
              value: data.slicer.slices
            },
            {
              display_type: "number",
              trait_type: "Superowner slices",
              value: data.slicer.minimumSlices
            },
            {
              trait_type: "Creator",
              value: creatorAddress
              // value: creatorAddressFormatted,
            },
            {
              display_type: "date",
              trait_type: "Sliced on",
              value: data.slicer.createdAtTimestamp
            }
          ]
          if (controllerAddress != ethers.constants.AddressZero) {
            attributes.splice(3, 0, {
              trait_type: "Controller",
              value: controllerAddress
            })
          }

          slicerInfo = {
            id: Number(decimalId),
            name: `Slicer #${decimalId}`,
            description: "",
            tags: "",
            external_url: `${domain}/slicer/${decimalId}`,
            address: data.slicer.address,
            image: "https://slice.so/slicer_default.png",
            isImmutable: data.slicer.isImmutable,
            attributes,
            config: { sponsors: true },
            sponsors: {}
          }
          await prisma.slicer.create({
            data: slicerInfo
          })
        }

        if (
          slicerInfo?.attributes.findIndex(
            (attr) => attr["trait_type"] == "Sliced on"
          ) == -1
        ) {
          const attributes = slicerInfo.attributes

          const { data } = await client.query({
            query: gql`
              query Slicers {
                slicer(id: "${hexId}") {
                  createdAtTimestamp
                }
              }
            `
          })
          if (data?.slicer?.createdAtTimestamp) {
            attributes.push({
              display_type: "date",
              trait_type: "Sliced on",
              value: data.slicer.createdAtTimestamp
            })
          }
          await prisma.slicer.update({
            where: { id: Number(decimalId) },
            data: { attributes }
          })
        }

        if (stats !== "false") {
          // Fetch subgraph data
          const { data } = await client.query({
            query: gql`
              query Slicers {
                slicer(id: "${hexId}") {
                  slices
                }
              }
            `
          })

          // Update total slices
          if (slicerInfo?.attributes[0]["value"] != data.slicer.slices) {
            slicerInfo.attributes[0] = {
              display_type: "number",
              trait_type: "Total slices",
              value: data.slicer.slices
            }
            await prisma.slicer.update({
              where: { id: Number(decimalId) },
              data: { attributes: slicerInfo.attributes }
            })
          }

          // // TODO: Switch this query from subgraph to Alchemy tokenAPI
          // const totalReceived = getEthFromWei(data.slicer.ethReceived, true)
          // slicerInfo.attributes.push({
          //   display_type: "number",
          //   trait_type: "ETH Received",
          //   value: totalReceived || "0"
          // })
        }
      } else {
        slicerInfo = {
          id: null,
          name: "",
          description: "",
          tags: "",
          external_url: "",
          address: "",
          image: "",
          isImmutable: false,
          attributes: [],
          config: { sponsors: true },
          sponsors: {}
        }
      }
      res.status(200).json(slicerInfo)
    }

    if (req.method === "POST") {
      const { name, tags, description, imageUrl, customPath } = JSON.parse(
        req.body
      )

      if (customPath && (Number(customPath) == 0 || Number(customPath))) {
        throw Error("Custom path cannot be a number")
      }

      const slicerInfo = await prisma.slicer.findFirst({
        where: { id: Number(decimalId) },
        select: {
          isImmutable: true,
          id: true,
          name: true,
          tags: true,
          description: true,
          image: true,
          slicerConfig: true
        }
      })

      if (
        slicerInfo.isImmutable &&
        slicerInfo.name !== `Slicer #${decimalId}` &&
        slicerInfo.description !== "" &&
        slicerInfo.tags !== "" &&
        slicerInfo.image !== "https://slice.so/slicer_default.png"
      ) {
        throw Error("Collectible asset already set")
      }

      let path = slicerInfo.slicerConfig?.customPath
      if (customPath != path) {
        path = encodeURI(customPath)
      }

      const query = await prisma.slicer.update({
        where: { id: Number(decimalId) },
        data: {
          name,
          tags,
          description,
          image: imageUrl,
          slicerConfig: {
            upsert: {
              create: {
                customPath: path
              },
              update: {
                customPath: path
              }
            }
          }
        }
      })
      res.status(200).json({ query })
    }
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export default handler
