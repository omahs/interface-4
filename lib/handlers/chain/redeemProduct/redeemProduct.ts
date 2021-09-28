import WalletConnect from "@walletconnect/client"
import { initialize } from "@lib/useProvider"
import { slicer } from "@lib/initProvider"

const redeemProduct = async (
  connector: WalletConnect,
  slicerId: number,
  productId: number
) => {
  const { signer } = await initialize(connector)
  const contract = await slicer(slicerId, signer)

  try {
    const call = await contract.validatePurchase(productId)
    return call
  } catch (err) {
    throw err
  }
}

export default redeemProduct
