import { initialize } from "@lib/useProvider"
import { slicer } from "@lib/initProvider"
import { GetProductPrice } from ".."

const PayProduct = async (
  slicerId: number,
  productId: number,
  quantity: number
) => {
  const { signer, signerAddress } = await initialize()
  const slicerContract = await slicer(slicerId, signer)
  const totalPrice = await GetProductPrice(slicerId, productId, quantity)

  const data = await slicerContract.payProduct(
    signerAddress,
    productId,
    quantity,
    {
      value: totalPrice,
    }
  )

  return data
}

export default PayProduct
