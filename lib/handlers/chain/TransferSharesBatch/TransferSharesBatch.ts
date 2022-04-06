import WalletConnect from "@walletconnect/client"

const TransferSharesBatch = async (
  connector: WalletConnect,
  from: string,
  slicerId: number,
  accounts: string[],
  shares: number[],
  toRelease: boolean
) => {
  const { initialize } = await import("@lib/useProvider")
  const { sliceCore } = await import("@lib/initProvider")

  const { signer } = await initialize(connector)
  const contract = sliceCore(signer)

  try {
    const call = await contract.slicerBatchTransfer(
      from,
      accounts,
      slicerId,
      shares,
      toRelease
    )
    return [contract, call]
  } catch (err) {
    throw err
  }
}

export default TransferSharesBatch
