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
  if (connector.connected) {
    res = await connector.sendTransaction(transactionParameters)
  } else {
    res = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters]
    })
  }
  return res
}

export default handleSendTransaction
