import WalletConnect from "@walletconnect/client"

const TriggerRelease = async (
  connector: WalletConnect,
  slicerId: number,
  account: string,
  currency: string,
  toWithdraw = false
) => {
  const { initialize } = await import("@lib/useProvider")
  const { slicer } = await import("@lib/initProvider")

  const { signer } = await initialize(connector)
  const contract = await slicer(slicerId, signer)

  try {
    const call = await contract.release(account, currency, toWithdraw)
    return [contract, call]
  } catch (err) {
    throw err
  }
}

export default TriggerRelease
