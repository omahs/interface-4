import handleSendTransaction from "@utils/handleSendTransaction"
import { BigNumber } from "ethers"
import { useState } from "react"
import { useAppContext } from "../context"
import InputPrice from "../InputPrice"

type Props = {
  slicerAddress: string
}

const PaySlicer = ({ slicerAddress }: Props) => {
  const { account, connector } = useAppContext()
  const [usdValue, setUsdValue] = useState(0)
  const [ethValue, setEthValue] = useState(0)
  const [loading, setLoading] = useState(false)

  const pay = async () => {
    setLoading(true)
    try {
      const value = BigNumber.from(Math.floor(ethValue * 100000)).mul(
        BigNumber.from(10).pow(13)
      )._hex
      const transactionInfo = await handleSendTransaction(
        account,
        slicerAddress,
        value,
        connector
      )

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
