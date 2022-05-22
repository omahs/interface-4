import { useEffect, useState } from "react"
import InputPrice from "../InputPrice"
import { useSendTransaction } from "wagmi"
import { BigNumber } from "ethers"
import { useAddRecentTransaction } from "@rainbow-me/rainbowkit"

type Props = {
  slicerAddress: string
}

const PaySlicer = ({ slicerAddress }: Props) => {
  const addRecentTransaction = useAddRecentTransaction()
  const [usdValue, setUsdValue] = useState(0)
  const [ethValue, setEthValue] = useState(0)
  const value = BigNumber.from(Math.floor(ethValue * 100000)).mul(
    BigNumber.from(10).pow(13)
  )._hex
  const { data, isIdle, isError, isLoading, isSuccess, sendTransaction } =
    useSendTransaction({
      request: {
        to: slicerAddress,
        value
      }
    })

  useEffect(() => {
    if (data?.hash) {
      addRecentTransaction({
        hash: data.hash,
        description: `Send ETH to Slicer`
      })
    }
  }, [data])

  useEffect(() => {
    if (!isLoading && isSuccess) {
      setEthValue(0)
      setUsdValue(0)
    }
  }, [isLoading, isSuccess])

  return (
    <InputPrice
      ethValue={ethValue}
      setEthValue={setEthValue}
      usdValue={usdValue}
      setUsdValue={setUsdValue}
      loading={isLoading}
      actionLabel="Send"
      marginLabel="mr-32"
      action={() => sendTransaction()}
    />
  )
}

export default PaySlicer
