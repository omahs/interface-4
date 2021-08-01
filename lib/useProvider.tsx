import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { ethers } from "ethers"
import { slicer } from "@lib/initProvider"
import { useAppContext } from "@components/ui/context"

export const defaultProvider = ethers.getDefaultProvider(
  process.env.NEXT_PUBLIC_NETWORK_URL
)

export const initialize = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  const signerAddress = await signer.getAddress()
  return { provider, signer, signerAddress }
}

export const useAllowed = (slicerId: number) => {
  const { account } = useAppContext()
  const [isAllowed, setIsAllowed] = useState(false)
  const getAllowed = async () => {
    if (slicerId != null && account) {
      const slicerContract = await slicer(slicerId, defaultProvider)
      const isPayeeAllowed = await slicerContract.isPayeeAllowed(account)
      setIsAllowed(isPayeeAllowed)
    } else {
      setIsAllowed(false)
    }
  }
  useEffect(() => {
    getAllowed()
  }, [account])
  return isAllowed
}

const useProvider = (setLoading: Dispatch<SetStateAction<boolean>>) => {
  const [isConnected, setIsConnected] = useState(false)
  const [account, setAccount] = useState("")

  const getProvider = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const accounts = await provider.listAccounts()
      setIsConnected(accounts.length > 0)
      setAccount(accounts[0])
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

  return { isConnected, account }
}

export default useProvider
