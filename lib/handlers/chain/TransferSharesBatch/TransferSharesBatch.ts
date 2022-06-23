import { Signer } from "ethers"

const TransferSharesBatch = async (
  signer: Signer,
  from: string,
  slicerId: number,
  accounts: string[],
  shares: number[],
  toRelease: boolean
) => {
  const { sliceCore } = await import("@lib/initProvider")

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
