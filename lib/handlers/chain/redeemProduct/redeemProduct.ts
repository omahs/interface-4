import WalletConnect from "@walletconnect/client"

const redeemProduct = async (
  connector: WalletConnect,
  slicerId: number,
  productId: number
) => {
  const { initialize } = await import("@lib/useProvider")
  const { productsModule } = await import("@lib/initProvider")

  const { signer } = await initialize(connector)
  const contract = productsModule(signer)

  try {
    const call = await contract.validatePurchase(slicerId, productId)
    return call
  } catch (err) {
    throw err
  }
}

export default redeemProduct
