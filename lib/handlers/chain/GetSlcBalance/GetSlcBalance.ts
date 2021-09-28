import WalletConnect from "@walletconnect/client"
import { initialize } from "@lib/useProvider"
import { slc } from "@lib/initProvider"

const GetSlcBalance = async (connector: WalletConnect, address: string) => {
  const { provider } = await initialize(connector)
  const contract = slc(provider)

  try {
    const call = await contract.balanceOf(address)
    return [contract, call]
  } catch (err) {
    throw err
  }
}

export default GetSlcBalance
