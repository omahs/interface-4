import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { ethers } from "ethers"
import { slicer } from "@lib/initProvider"

export const useAllowed = (slicerId: number) => {
  const [isAllowed, setIsAllowed] = useState(false)
  const getAllowed = async () => {
    if (slicerId != null) {
      const { signer, signerAddress } = await initialize()
      const slicerContract = await slicer(slicerId, signer)
      const allowed = await slicerContract.isPayeeAllowed(signerAddress)
      setIsAllowed(allowed)
    } else {
      return null
    }
  }
  getAllowed()
  return isAllowed
}

export const initialize = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  const signerAddress = await signer.getAddress()
  return { provider, signer, signerAddress }
}

const useProvider = (setLoading: Dispatch<SetStateAction<boolean>>) => {
  const [isConnected, setIsConnected] = useState(false)

  const getProvider = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const accounts = await provider.listAccounts()
      setIsConnected(accounts.length > 0)
    }
  }

  useEffect(() => {
    getProvider()
    setLoading(false)
  })

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", () => {
        getProvider()
      })
    }
  }, [])

  return isConnected
}

export default useProvider
