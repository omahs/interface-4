import WalletConnect from "@walletconnect/client"
import { slice } from "@lib/initProvider"
import { initialize } from "@lib/useProvider"

const Slice = async (
  connector: WalletConnect,
  accounts: string[],
  shares: number[],
  minimumShares: number,
  isCollectible: boolean
) => {
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
