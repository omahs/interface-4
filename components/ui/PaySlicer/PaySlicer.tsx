import { Input } from "@components/ui"
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

  const handleChange = (value) => {
    if (isEth) {
      setEthValue(value)
      setUsdValue(value * Number(data?.price))
    } else {
      setUsdValue(value)
      setEthValue(value / Number(data?.price))
    }
  }

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

      setEthValue(0)
      setUsdValue(0)
    } catch (err) {
      null
    }
    setLoading(false)
  }

  useEffect(() => {
    if (isEth) {
      setEthValue(Math.floor(ethValue * 10000) / 10000)
    } else {
      setUsdValue(Math.floor(usdValue * 100) / 100)
    }
  }, [isEth])

  return (
    <div className="w-full max-w-sm mx-auto space-y-6">
      {isEth ? (
        <>
          <div className="relative">
            <Input
              type="number"
              placeholder="0.01"
              prefix="Ξ"
              prefixAction={() => setIsEth(false)}
              value={ethValue}
              onChange={handleChange}
              onClick={() => pay()}
              onClickLabel={"Pay"}
            />
            <div className="absolute top-0 right-0 flex items-center h-full pb-0.5 mr-28 xs:mr-[7.6rem]">
              <p className="text-sm text-gray-600">
                $ {Math.floor(usdValue * 100) / 100}
                {/* <a
                  className="ml-1.5 text-gray-400"
                  onClick={() => setIsEth(false)}
                  >
                  Switch to USD
                </a> */}
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="relative">
            <Input
              type="number"
              placeholder="100"
              prefix="$"
              prefixAction={() => setIsEth(true)}
              value={usdValue}
              onChange={handleChange}
              onClick={() => pay()}
              onClickLabel={"Pay"}
            />
            <div className="absolute top-0 right-0 flex items-center h-full pb-0.5 mr-28 xs:mr-[7.6rem]">
              <p className="text-sm text-gray-600">
                Ξ {Math.floor(ethValue * 10000) / 10000}
                {/* <a
                  className="ml-1.5 text-gray-400"
                  onClick={() => setIsEth(true)}
                  >
                  Switch to ETH
                </a> */}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default PaySlicer
