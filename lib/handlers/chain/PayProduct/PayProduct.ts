import { initialize } from "@lib/useProvider"
import { slicer } from "@lib/initProvider"
import { GetProductPrice } from ".."

const PayProduct = async (
  slicerId: number,
  productId: number,
  quantity: number
) => {
  const { signer, signerAddress } = await initialize()
  const contract = await slicer(slicerId, signer)

  try {
    const totalPrice = await GetProductPrice(slicerId, productId, quantity)
    const call = await contract.payProduct(signerAddress, productId, quantity, {
      value: totalPrice,
    })
    return [contract, call]
  } catch (err) {
    throw err
  }
}

export default PayProduct
