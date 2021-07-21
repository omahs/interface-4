import { Button, Input } from "@components/ui"
import fetcher from "@utils/fetcher"
import { ethers } from "ethers"
import { useEffect, useState } from "react"
import useSWR from "swr"

type Props = {
  slicerAddress: string
}

const PaySlicer = ({ slicerAddress }: Props) => {
  const { data } = useSWR(
    "https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT",
    fetcher
  )

  const [isEth, setIsEth] = useState(true)
  const [usdValue, setUsdValue] = useState(0)
  const [ethValue, setEthValue] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (data) {
      setEthValue(usdValue / Number(data.price))
    }
  }, [usdValue])
  useEffect(() => {
    if (data) {
      setUsdValue(ethValue * Number(data.price))
    }
  }, [ethValue])

  const pay = async () => {
    setLoading(true)
    try {
      const transactionParameters = {
        to: slicerAddress,
        from: window.ethereum.selectedAddress,
        value: ethers.utils.parseEther(String(ethValue))._hex,
      }
      await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      })
    } catch (err) {
      null
    }
    setLoading(false)
  }

  return (
    <div className="w-full max-w-sm mx-auto space-y-6">
      {isEth ? (
        <>
          <div className="relative">
            <Input
              placeholder="0.01"
              prefix="ETH"
              value={ethValue}
              onChange={setEthValue}
            />
            <div className="absolute top-0 right-0 flex items-center h-full mr-4">
              <a
                className="text-xs mb-0.5 text-gray-600"
                onClick={() => setIsEth(false)}
              >
                Switch to USD
              </a>
            </div>
          </div>
          <p>${Math.floor(usdValue * 100) / 100} </p>
        </>
      ) : (
        <>
          <div className="relative">
            <Input
              placeholder="100"
              prefix="$"
              value={usdValue}
              onChange={setUsdValue}
            />
            <div className="absolute top-0 right-0 flex items-center h-full mr-4">
              <a
                className="text-xs mb-0.5 text-gray-600"
                onClick={() => setIsEth(true)}
              >
                Switch to ETH
              </a>
            </div>
          </div>
          <p>ETH {Math.floor(ethValue * 100) / 100} </p>
        </>
      )}
      <Button
        label="Pay"
        loading={loading}
        onClick={() => pay()}
        requireConnection
      />
    </div>
  )
}

export default PaySlicer
