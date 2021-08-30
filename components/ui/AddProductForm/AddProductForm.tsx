import { useState, Dispatch, SetStateAction } from "react"
import { Button } from "@components/ui"
import { AddProduct } from "@lib/handlers/chain"
import handleSubmit from "@utils/handleSubmit"
import handleMessage, { Message } from "@utils/handleMessage"
import { LogDescription } from "ethers/lib/utils"
import MessageBlock from "../MessageBlock"
import InputPrice from "../InputPrice"
import Question from "../Question"
import MySwitch from "../MySwitch"

type Props = {
  slicerId: number
  success: boolean
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
  setSuccess: Dispatch<SetStateAction<boolean>>
  setLogs: Dispatch<SetStateAction<LogDescription[]>>
}

const AddProductForm = ({
  slicerId,
  success,
  loading,
  setLoading,
  setSuccess,
  setLogs,
}: Props) => {
  const [usdValue, setUsdValue] = useState(0)
  const [ethValue, setEthValue] = useState(0)

  const [isUSD, setIsUSD] = useState(false)
  const [isMultiple, setIsMultiple] = useState(false)
  const [isInfinite, setIsInfinite] = useState(true)
  const [units, setUnits] = useState(0)
  const [data, setData] = useState([])
  const [purchaseData, setPurchaseData] = useState([])
  const [message, setMessage] = useState<Message>()
  const productPrice = isUSD ? Math.floor(usdValue * 100) : ethValue

  const submit = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault()
    try {
      // if (...) {
      const eventLogs = await handleSubmit(
        AddProduct(
          slicerId,
          0,
          productPrice,
          isUSD,
          isMultiple,
          isInfinite,
          units,
          data,
          purchaseData
        ),
        setMessage,
        setLoading,
        setSuccess,
        true
      )
      setLogs(eventLogs)
      // } else {
      //   handleMessage(
      //     {
      //       message: "Inputs don't correspond, please try again",
      //       messageStatus: "error",
      //     },
      //     setMessage
      //   )
      // }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <form
      className="w-full max-w-screen-sm py-6 mx-auto space-y-4"
      onSubmit={submit}
    >
      <InputPrice
        ethValue={ethValue}
        setEthValue={setEthValue}
        usdValue={usdValue}
        setUsdValue={setUsdValue}
        loading={loading}
      />
      {/* Todo: isUSD toggle / dyn. pricing */}
      <div className="relative flex items-center justify-end col-span-5 xs:col-end-7">
        <p className="pr-1">Dynamic pricing</p>
        <Question
          text={
            <>
              <p className="pb-4">
                If enabled, the user will always pay in ETH the USD value set (
                <b>${usdValue / 100}</b>). This protects against drastic changes
                of the ETH currency.
              </p>
              <p className="pb-4">
                <b>Note:</b> Products with dynamic pricing have a higher
                transaction fee for the buyer. You can also disable dynamic
                pricing later.
              </p>
            </>
          }
        />
        <MySwitch enabled={isUSD} setEnabled={setIsUSD} />
      </div>
      <div className="py-1">
        <Button label="Slice" type="submit" />
      </div>
      <div>
        <MessageBlock msg={message} />
      </div>
    </form>
  )
}

export default AddProductForm

// Todo: This page
