import WalletConnect from "@walletconnect/client"

const Slice = async (
  connector: WalletConnect,
  payees: {
    account: string
    shares: number
  }[],
  minimumShares: number,
  currencies: string[],
  releaseTimelock: number,
  transferableTimelock: number,
  isImmutable: boolean,
  isControlled: boolean
) => {
  const { initialize } = await import("@lib/useProvider")
  const { sliceCore } = await import("@lib/initProvider")

  const { signer } = await initialize(connector)
  const contract = sliceCore(signer)

  try {
    const call = await contract.slice(
      payees,
      minimumShares,
      currencies,
      releaseTimelock,
      transferableTimelock,
      isImmutable,
      isControlled
    )
    return [contract, call]
  } catch (err) {
    throw err
  }
}

export default Slice
