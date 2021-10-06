import WalletConnect from "@walletconnect/client"

const getEthUsd = async (connector: WalletConnect) => {
  const { slice } = await import("@lib/initProvider")
  const { initialize } = await import("@lib/useProvider")

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
