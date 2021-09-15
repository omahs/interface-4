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
import { beforeCreate, handleReject } from "@lib/handleCreateProduct"
import { useAppContext } from "../context"

type Props = {
  slicerId: number
  success: boolean
  loading: boolean
  loadingState: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
  setLoadingState: Dispatch<SetStateAction<boolean>>
  setSuccess: Dispatch<SetStateAction<boolean>>
  setLogs: Dispatch<SetStateAction<LogDescription[]>>
}

const AddProductForm = ({
  slicerId,
  success,
  loading,
  setLoading,
  loadingState,
  setLoadingState,
  setSuccess,
  setLogs,
}: Props) => {
  const { account } = useAppContext()
  const [usdValue, setUsdValue] = useState<number>()
  const [ethValue, setEthValue] = useState<number>()
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
  const [thankMessage, setThankMessage] = useState("")
  const [instructions, setInstructions] = useState("")
  const [notes, setNotes] = useState("")
  const [files, setFiles] = useState<File[]>([])
  const [message, setMessage] = useState<Message>({
    message: "",
    messageStatus: "success",
  })

  const submit = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { image, newProduct, data, purchaseDataCID, purchaseData } =
        await beforeCreate(
          account,
          slicerId,
          name,
          description,
          newImage,
          files,
          thankMessage,
          instructions,
          notes
        )

      // Create product on smart contract
      const productPrice = isUSD ? Math.floor(usdValue * 100) : ethValue

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

      if (!success) {
        await handleReject(
          slicerId,
          image,
          data,
          purchaseDataCID,
          newProduct.id
        )
      }
    } catch (err) {
      // Todo: handleReject in case of errors
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
      <AddProductFormPurchases
        thankMessage={thankMessage}
        setThankMessage={setThankMessage}
        instructions={instructions}
        setInstructions={setInstructions}
        notes={notes}
        setNotes={setNotes}
        files={files}
        setFiles={setFiles}
      />

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

// Todo: What else to add to metadata and purchaseData?

// Todo: Handle scenario where user doesn't reject and just leave. (timeout?)

// Todo: Add dynamic loading states on submit (1. getting ready, 2. waiting for blockchain, 3. reverting)
