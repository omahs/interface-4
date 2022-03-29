import WalletConnect from "@walletconnect/client"
import { ContractTransaction } from "ethers"

const TransferShares = async (
  connector: WalletConnect,
  from: string,
  to: string,
  slicerId: number,
  shares: number,
  toRelease = true
) => {
  const { initialize } = await import("@lib/useProvider")
  const { sliceCore } = await import("@lib/initProvider")

  const { signer } = await initialize(connector)
  const contract = sliceCore(signer)

  try {
    let call: ContractTransaction
    if (toRelease) {
      call = await contract.safeTransferFrom(from, to, slicerId, shares, [])
    } else {
      call = await contract.safeTransferFromUnreleased(
        from,
        to,
        slicerId,
        shares,
        []
      )
    }
    return [contract, call]
  } catch (err) {
    throw err
  }
}

export default TransferShares
