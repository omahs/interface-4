import WalletConnect from "@walletconnect/client"

const handleSendTransaction = async (
  from: string,
  to: string,
  value: string | number,
  connector: WalletConnect
) => {
  const transactionParameters = {
    to,
    from,
    value
  }
  let res
  if (connector) {
    res = await connector.sendTransaction(transactionParameters)
  }
  return res
}

export default handleSendTransaction
