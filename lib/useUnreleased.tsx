import { useEffect, useState } from "react"
import { ethers } from "ethers"
import multicall from "@utils/multicall"

const useUnreleased = (slicerAddress: string, addresses: string[]) => {
  const [unreleased, setUnreleased] = useState([])

  const getOwnersUnreleased = async (args: string[]) => {
    const result = await multicall(slicerAddress, "unreleased(address)", args)
    setUnreleased(result)
  }

  useEffect(() => {
    if (slicerAddress && addresses.length != 0) {
      const args = []
      addresses.forEach((address) => {
        if (address) {
          args.push(ethers.utils.hexZeroPad(address, 32).substring(2))
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
