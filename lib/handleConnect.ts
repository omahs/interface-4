const handleConnect = async () => {
  await window.ethereum.request({ method: "eth_requestAccounts" })
}

export default handleConnect
