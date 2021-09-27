import { BigNumber } from "ethers"
import { useState } from "react"
import { useAppContext } from "../context"
import InputPrice from "../InputPrice"

type Props = {
  slicerAddress: string
}

const PaySlicer = ({ slicerAddress }: Props) => {
  const { account } = useAppContext()
  const [usdValue, setUsdValue] = useState(0)
  const [ethValue, setEthValue] = useState(0)
  const [loading, setLoading] = useState(false)

  const pay = async () => {
    setLoading(true)
    try {
      const transactionParameters = {
        to: slicerAddress,
        from: account,
        value: BigNumber.from(Math.floor(ethValue * 100000)).mul(
          BigNumber.from(10).pow(13)
        )._hex,
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

  return (
    <InputPrice
      ethValue={ethValue}
      setEthValue={setEthValue}
      usdValue={usdValue}
      setUsdValue={setUsdValue}
      loading={loading}
      actionLabel="Send"
      marginLabel="mr-32"
      action={pay}
    />
  )
}

export default PaySlicer
