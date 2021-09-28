import WalletConnect from "@walletconnect/client"
import { initialize } from "@lib/useProvider"
import { slice } from "@lib/initProvider"

const getEthUsd = async (connector: WalletConnect) => {
  const { provider } = await initialize(connector)
  const contract = slice(provider)

  try {
    const call = await contract.getEthUsd()
    // const ethUsd = Number(call) / 10 ** 8
    return [contract, call]
  } catch (err) {
    throw err
  }
}

export default getEthUsd
