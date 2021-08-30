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

  const currency = isEth ? "Ξ" : "$"
  const destinationCurrency = isEth ? "$" : "Ξ"

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
      <div className="relative">
        <Input
          type="number"
          placeholder={isEth ? "0.01" : "100"}
          prefix={currency}
          prefixAction={() => setIsEth((isEth) => !isEth)}
          value={isEth ? ethValue : usdValue}
          onChange={handleChange}
          onClick={() => pay()}
          onClickLabel={"Pay"}
          loading={loading}
        />
        <div className="absolute top-0 right-0 flex items-center h-full pb-0.5 mr-28 xs:mr-[7.6rem]">
          <p className="text-sm text-gray-600">
            {destinationCurrency}{" "}
            {isEth
              ? Math.floor(usdValue * 100) / 100
              : Math.floor(ethValue * 10000) / 10000}
          </p>
        </div>
      </div>
    </div>
  )
}

export default PaySlicer
