import WalletConnect from "@walletconnect/client"

const releaseEthToSlicer = async (
  connector: WalletConnect,
  slicerId: number
) => {
  const { initialize } = await import("@lib/useProvider")
  const { productsModule } = await import("@lib/initProvider")

  const { signer } = await initialize(connector)
  const contract = productsModule(signer)

  try {
    const call = await contract.releaseEthToSlicer(slicerId)
    return call
  } catch (err) {
    throw err
  }
}

export default releaseEthToSlicer
