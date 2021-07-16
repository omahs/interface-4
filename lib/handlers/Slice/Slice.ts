import { slice } from "@lib/initProvider"
import { initialize } from "@lib/useProvider"

const Slice = async (
  accounts: string[],
  shares: number[],
  minimumShares: number
) => {
  const { signer } = await initialize()
  const sliceContract = slice(signer)

  try {
    const call = await sliceContract.slice(accounts, shares, minimumShares)
    return [sliceContract, call]
  } catch (err) {
    throw err
  }
}

export default Slice
