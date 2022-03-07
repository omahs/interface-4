import { Dispatch, SetStateAction, useEffect, useState } from "react"
import WalletConnect from "@walletconnect/client"

const resolveEns = async (
  connector: WalletConnect,
  address: string,
  setAddress: Dispatch<SetStateAction<string>>
) => {
  const { initialize } = await import("@lib/useProvider")

  if (address) {
    try {
      const { provider } = await initialize(connector)

      const resolved =
        address.substring(0, 2) === "0x"
          ? await provider.lookupAddress(address)
          : await provider.resolveName(address)
      setAddress(resolved)
    } catch (err) {
      if (address.substring(0, 2) !== "0x") {
        setAddress("Invalid ENS name")
      }
    }
  }
}

export const useEns = (connector: WalletConnect, address: string) => {
  const [resolvedAddress, setResolvedAddress] = useState("")
  useEffect(() => {
    resolveEns(connector, address, setResolvedAddress)
  }, [address])
  return resolvedAddress
}

export default resolveEns
