import WalletConnect from "@walletconnect/client"

const TriggerRelease = async (
  connector: WalletConnect,
  account: string,
  slicerId: number
) => {
  const { initialize } = await import("@lib/useProvider")
  const { slicer } = await import("@lib/initProvider")

  const { signer } = await initialize(connector)
  const contract = await slicer(slicerId, signer)

  try {
    const call = await contract.release(account)
    return [contract, call]
  } catch (err) {
    throw err
  }
}

export default TriggerRelease
