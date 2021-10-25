import WalletConnect from "@walletconnect/client"

const TransferShares = async (
  connector: WalletConnect,
  from: string,
  to: string,
  slicerId: number,
  shares: number
) => {
  const { initialize } = await import("@lib/useProvider")
  const { sliceCore } = await import("@lib/initProvider")

  const { signer } = await initialize(connector)
  const contract = sliceCore(signer)

  try {
    const call = await contract.safeTransferFrom(from, to, slicerId, shares, [])
    return [contract, call]
  } catch (err) {
    throw err
  }
}

export default TransferShares
