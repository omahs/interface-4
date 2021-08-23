import { slice } from "@lib/initProvider"
import { initialize } from "@lib/useProvider"

const Slice = async (
  accounts: string[],
  shares: number[],
  minimumShares: number,
  isCollectible: boolean
) => {
  const { signer } = await initialize()
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
