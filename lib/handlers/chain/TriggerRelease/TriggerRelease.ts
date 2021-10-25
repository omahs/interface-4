import WalletConnect from "@walletconnect/client"

const TriggerRelease = async (
  connector: WalletConnect,
  account: string,
  slicerAddresses: string[],
  slicerPercentage: number
) => {
  const { initialize } = await import("@lib/useProvider")
  const { slice, slc } = await import("@lib/initProvider")

  const { signer } = await initialize(connector)
  const contract = slc(signer)
  const sliceContract = slice(signer)

  try {
    const call = await sliceContract.triggerRelease(
      account,
      slicerAddresses,
      slicerPercentage
    )
    return [contract, call]
  } catch (err) {
    throw err
  }
}

export default TriggerRelease
