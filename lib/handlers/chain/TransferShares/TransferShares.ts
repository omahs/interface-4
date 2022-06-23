import { ContractTransaction, Signer } from "ethers"

const TransferShares = async (
  signer: Signer,
  from: string,
  to: string,
  slicerId: number,
  shares: number,
  toRelease: boolean
) => {
  const { sliceCore } = await import("@lib/initProvider")

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
