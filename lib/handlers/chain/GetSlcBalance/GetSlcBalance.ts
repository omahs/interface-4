import WalletConnect from "@walletconnect/client"

const GetSlcBalance = async (connector: WalletConnect, address: string) => {
  const { initialize } = await import("@lib/useProvider")
  const { slc } = await import("@lib/initProvider")

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
