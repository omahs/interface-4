import { useState, Dispatch, SetStateAction } from "react"
import {
  Button,
  MessageBlock,
  AddProductFormPrice,
  AddProductFormGeneral,
  AddProductFormPurchases,
} from "@components/ui"
import { AddProduct } from "@lib/handlers/chain"
import handleSubmit from "@utils/handleSubmit"
import handleMessage, { Message } from "@utils/handleMessage"
import { LogDescription } from "ethers/lib/utils"
import { NewImage } from "pages/slicer/[id]"
import supabaseUpload from "@utils/supabaseUpload"

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
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [newImage, setNewImage] = useState<NewImage>({
    url: "",
    file: undefined,
  })
  const [isUSD, setIsUSD] = useState(false)
  const [isSingle, setIsSingle] = useState(false)
  const [isLimited, setIsLimited] = useState(false)
  const [units, setUnits] = useState(0)
  const [purchaseData, setPurchaseData] = useState([])
  const [message, setMessage] = useState<Message>()

  const submit = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault()
    try {
      // if (...) {

      // Todo: Blockchain query to retrieve current productId
      const productId = 1

      // Todo: Figure out how to conclude image upload flow
      const { Key } = await supabaseUpload(
        `slicer_${slicerId}_product_${productId}`,
        newImage
      )

      const productPrice = isUSD ? Math.floor(usdValue * 100) : ethValue
      const data = []

      const eventLogs = await handleSubmit(
        AddProduct(
          slicerId,
          0,
          productPrice,
          isUSD,
          !isSingle,
          !isLimited,
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
    <form className="w-full max-w-sm py-6 mx-auto space-y-6" onSubmit={submit}>
      <AddProductFormGeneral
        newImage={newImage}
        setNewImage={setNewImage}
        name={name}
        description={description}
        loading={loading}
        setName={setName}
        setDescription={setDescription}
      />
      <AddProductFormPrice
        isSingle={isSingle}
        isLimited={isLimited}
        units={units}
        ethValue={ethValue}
        usdValue={usdValue}
        isUSD={isUSD}
        loading={loading}
        setIsSingle={setIsSingle}
        setIsLimited={setIsLimited}
        setUnits={setUnits}
        setEthValue={setEthValue}
        setUsdValue={setUsdValue}
        setIsUSD={setIsUSD}
      />
      <AddProductFormPurchases setPurchaseData={setPurchaseData} />

      <div className="pt-4 pb-1">
        <Button label="Create product" type="submit" />
      </div>
      <div>
        <MessageBlock msg={message} />
      </div>
    </form>
  )
}

export default AddProductForm

// Todo: This page
