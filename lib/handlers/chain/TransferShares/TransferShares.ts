import { initialize } from "@lib/useProvider"
import { sliceCore } from "@lib/initProvider"

const TransferShares = async (
  from: string,
  to: string,
  slicerId: number,
  shares: number
) => {
  const { signer } = await initialize()
  const contract = sliceCore(signer)

  try {
    const call = await contract.safeTransferFrom(from, to, slicerId, shares, [])
    return [contract, call]
  } catch (err) {
    throw err
  }
}

export default TransferShares
