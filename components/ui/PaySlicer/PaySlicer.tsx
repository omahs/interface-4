import { BigNumber } from "ethers"
import { useState } from "react"
import InputPrice from "../InputPrice"

type Props = {
  slicerAddress: string
}

const PaySlicer = ({ slicerAddress }: Props) => {
  const [usdValue, setUsdValue] = useState(0)
  const [ethValue, setEthValue] = useState(0)
  const [loading, setLoading] = useState(false)

  const pay = async () => {
    setLoading(true)
    try {
      const transactionParameters = {
        to: slicerAddress,
        from: window.ethereum.selectedAddress,
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
      actionLabel="Pay"
      marginLabel="mr-28 xs:mr-[7.6rem]"
      action={pay}
    />
  )
}

export default PaySlicer
