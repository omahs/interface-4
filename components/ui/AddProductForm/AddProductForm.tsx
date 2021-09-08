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
import useQuery from "@utils/subgraphQuery"
import { CreateProduct } from "@lib/handlers/prisma"
import fetcher from "@utils/fetcher"

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

  // Todo: Handle productId update after product creation
  const tokensQuery = /* GraphQL */ `
    slicer(id: "${slicerId}") {
      products {
        id
      }
    }
  `
  let subgraphData = useQuery(tokensQuery)
  const productId = subgraphData?.slicer?.products?.length + 1

  const submit = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (!productId) {
        throw Error("An unexpected error occurred. Try again")
      }
      // if (...) {

      let image = ""
      if (newImage.url) {
        {
          const { Key } = await supabaseUpload(
            `slicer_${slicerId}_product_${productId}`,
            newImage
          )
          image = Key
        }
      }

      const body = {
        method: "POST",
        body: JSON.stringify({
          productId,
          name,
          description,
          image,
        }),
      }
      await fetcher(`/api/slicer/${slicerId}/createProduct`, body)

      // const productPrice = isUSD ? Math.floor(usdValue * 100) : ethValue
      // const data = []

      // const eventLogs = await handleSubmit(
      //   AddProduct(
      //     slicerId,
      //     0,
      //     productPrice,
      //     isUSD,
      //     !isSingle,
      //     !isLimited,
      //     units,
      //     data,
      //     purchaseData
      //   ),
      //   setMessage,
      //   setLoading,
      //   setSuccess,
      //   true
      // )
      // setLogs(eventLogs)
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
    setLoading(false)
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
