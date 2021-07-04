import { useEffect, useState } from "react"
import { ethers } from "ethers"

const useProvider = (setLoading) => {
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    async function getProvider() {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const accounts = await provider.listAccounts()
        setIsConnected(accounts.length > 0)
      }
    }
    getProvider()
    setLoading(false)
  })

  return isConnected
}

export default useProvider
