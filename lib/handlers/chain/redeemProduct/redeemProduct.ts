import { Signer } from "ethers"

const redeemProduct = async (
  signer: Signer,
  slicerId: number,
  productId: number
) => {
  const { productsModule } = await import("@lib/initProvider")
  const contract = productsModule(signer)

  try {
    const call = await contract.validatePurchase(slicerId, productId)
    return call
  } catch (err) {
    throw err
  }
}

export default redeemProduct
