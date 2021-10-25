import WalletConnect from "@walletconnect/client"
import { Dispatch, SetStateAction } from "react"
import { View } from "./content/modals"

export const handleConnectMetamask = async (
  setModalView: Dispatch<SetStateAction<View>>
) => {
  await window.ethereum.request({ method: "eth_requestAccounts" })
  setModalView({ name: "" })
}

export const handleConnectWC = async (
  connector: WalletConnect,
  setModalView: Dispatch<SetStateAction<View>>
) => {
  try {
    // Check if connection is already established
    if (!connector.connected) {
      // create new session
      await connector.createSession()
      setModalView({ name: "" })
    }
  } catch (err) {
    console.log(err)
  }
}
