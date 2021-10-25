import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "@lib/db"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query

  try {
    if (req.method === "POST") {
      const { address, link } = JSON.parse(req.body)

      const { sponsors } = await prisma.slicer.findFirst({
        where: { id: Number(id) },
        select: { sponsors: true },
      })

      if (link) {
        let newLink: string
        if (link.includes("://")) {
          newLink = link
        } else {
          newLink = "https://" + link
        }
        sponsors[address] = newLink
      } else {
        delete sponsors[address]
      }

      const query = await prisma.slicer.update({
        where: { id: Number(id) },
        data: { sponsors },
      })
      res.status(200).json({ query })
    }
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export default handler
