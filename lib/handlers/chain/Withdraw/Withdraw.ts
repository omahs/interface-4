import WalletConnect from "@walletconnect/client"

const Withdraw = async (
  connector: WalletConnect,
  account: string,
  currency: string
) => {
  const { initialize } = await import("@lib/useProvider")
  const { fundsModule } = await import("@lib/initProvider")

  const { signer } = await initialize(connector)
  const contract = fundsModule(signer)

  try {
    const call = await contract.withdraw(account, currency)
    return [contract, call]
  } catch (err) {
    throw err
  }
}

export default Withdraw
