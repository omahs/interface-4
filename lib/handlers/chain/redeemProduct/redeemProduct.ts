import { initialize } from "@lib/useProvider"
import { slicer } from "@lib/initProvider"

const redeemProduct = async (slicerId: number, productId: number) => {
  const { signer } = await initialize()
  const contract = await slicer(slicerId, signer)

  try {
    const call = await contract.validatePurchase(productId)
    return call
  } catch (err) {
    throw err
  }
}

export default redeemProduct
