import { BigNumber } from "ethers"
import { initialize } from "@lib/useProvider"
import { slicer } from "@lib/initProvider"

const GetProductPrice = async (
  slicerId: number,
  productId: number,
  quantity: number
) => {
  const { signer } = await initialize()
  const contract = await slicer(slicerId, signer)
  const price = await contract.productInfo(productId)

  try {
    const call = BigNumber.from(price[1]).mul(quantity)
    return [contract, call]
  } catch (err) {
    throw err
  }
}

export default GetProductPrice
