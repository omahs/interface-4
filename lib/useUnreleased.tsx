import { useEffect, useState } from "react"
import multicall from "@utils/multicall"
import formatCalldata from "@utils/formatCalldata"

const useUnreleased = (
  slicerAddress: string,
  addresses: string[],
  currency: string
) => {
  const [unreleased, setUnreleased] = useState([])

  const getOwnersUnreleased = async (args: string[]) => {
    const result = await multicall(
      slicerAddress,
      "unreleased(address,address)",
      args
    )
    setUnreleased(result)
  }

  useEffect(() => {
    if (slicerAddress && addresses.length != 0) {
      const args = []
      addresses.forEach((address) => {
        if (address) {
          args.push(formatCalldata(address, currency))
        }
      })

      if (args.length != 0) {
        getOwnersUnreleased(args)
      }
    }
  }, [slicerAddress, addresses])

  return unreleased
}

export default useUnreleased

// TODO To fix
