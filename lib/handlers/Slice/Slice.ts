import { initialize } from "@lib/useProvider"
import { slice } from "@lib/initProvider"

const Slice = async (
  accounts: string[],
  shares: number[],
  minimumShares: number
) => {
  const { signer } = await initialize()
  const slicecontract = slice(signer)

  const data = await slicecontract.slice(accounts, shares, minimumShares)

  return data
}

export default Slice
