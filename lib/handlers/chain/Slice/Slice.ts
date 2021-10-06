import WalletConnect from "@walletconnect/client"

const Slice = async (
  connector: WalletConnect,
  accounts: string[],
  shares: number[],
  minimumShares: number,
  isCollectible: boolean
) => {
  const { initialize } = await import("@lib/useProvider")
  const { slice } = await import("@lib/initProvider")

  const { signer } = await initialize(connector)
  const contract = slice(signer)

  try {
    const call = await contract.slice(
      accounts,
      shares,
      minimumShares,
      isCollectible
    )
    return [contract, call]
  } catch (err) {
    throw err
  }
}

export default Slice
