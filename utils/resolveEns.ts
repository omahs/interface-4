import WalletConnect from "@walletconnect/client"
import { initialize } from "@lib/useProvider"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

const resolveEns = async (
  connector: WalletConnect,
  address: string,
  setAddress: Dispatch<SetStateAction<string>>
) => {
  if (address) {
    try {
      const { provider } = await initialize(connector)
      const resolved =
        address.substr(0, 2) === "0x"
          ? await provider.lookupAddress(address)
          : await provider.resolveName(address)
      const formatResolved =
        resolved.substr(0, 2) === "0x"
          ? resolved.replace(resolved.substring(5, resolved.length - 3), "___")
          : resolved
      setAddress(formatResolved)
    } catch (err) {
      if (address.substr(0, 2) !== "0x") {
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
