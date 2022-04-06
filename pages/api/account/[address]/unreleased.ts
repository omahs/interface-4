import type { NextApiRequest, NextApiResponse } from "next"
import multicall from "@utils/multicall"
import { ethers } from "ethers"
import formatCalldata from "@utils/formatCalldata"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { address } = req.query
  const { slicerAddresses } = JSON.parse(req.body)
  try {
    if (req.method === "POST") {
      const currency = ethers.constants.AddressZero
      const unreleased = await multicall(
        slicerAddresses,
        "unreleased(address,address)",
        [formatCalldata(String(address), currency)]
      )
      res.status(200).json(unreleased)
    }
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export default handler
