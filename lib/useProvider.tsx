import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { ethers } from "ethers"
import { slicer } from "@lib/initProvider"
import { useAppContext } from "@components/ui/context"

export const useAllowed = (slicerId: number) => {
  const { isConnected } = useAppContext()
  const [isAllowed, setIsAllowed] = useState(false)
  const getAllowed = async () => {
    if (slicerId != null && isConnected) {
      const { signer, signerAddress } = await initialize()
      const slicerContract = await slicer(slicerId, signer)
      const isPayeeAllowed = await slicerContract.isPayeeAllowed(signerAddress)
      setIsAllowed(isPayeeAllowed)
    } else {
      setIsAllowed(false)
    }
  }
  useEffect(() => {
    getAllowed()
  }, [isConnected])
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
