import { BigNumber } from "ethers"
import { initialize } from "@lib/useProvider"
import { slicer } from "@lib/initProvider"

const GetProductPrice = async (
  slicerId: number,
  productId: number,
  quantity: number
) => {
  const { signer } = await initialize()

  const slicerContract = await slicer(slicerId, signer)
  const price = await slicerContract.productInfo(productId)
  const totalPrice = BigNumber.from(price[1]).mul(quantity)

  return totalPrice
}

export default GetProductPrice
