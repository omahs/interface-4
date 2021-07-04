import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { ethers } from "ethers"

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
