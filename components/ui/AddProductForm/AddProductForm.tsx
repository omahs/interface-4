import { useState, Dispatch, SetStateAction, useEffect, useRef } from "react"
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
import {
  beforeCreate,
  handleReject,
  handleSuccess,
} from "@lib/handleCreateProduct"
import { useAppContext } from "../context"

type Props = {
  slicerId: number
  success: boolean
  loading: boolean
  uploadStep: number
  setLoading: Dispatch<SetStateAction<boolean>>
  setUploadStep: Dispatch<SetStateAction<number>>
  setSuccess: Dispatch<SetStateAction<boolean>>
  setLogs: Dispatch<SetStateAction<LogDescription[]>>
}

const AddProductForm = ({
  slicerId,
  success,
  loading,
  setLoading,
  uploadStep,
  setUploadStep,
  setSuccess,
  setLogs,
}: Props) => {
  const { account, setModalView } = useAppContext()
  const [usdValue, setUsdValue] = useState<number>()
  const [ethValue, setEthValue] = useState<number>()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [newImage, setNewImage] = useState<NewImage>({
    url: "",
    file: undefined,
  })
  const [isUSD, setIsUSD] = useState(false)
  const [isMultiple, setIsMultiple] = useState(false)
  const [isLimited, setIsLimited] = useState(false)
  const [units, setUnits] = useState(0)
  const [thankMessage, setThankMessage] = useState("")
  const [instructions, setInstructions] = useState("")
  const [notes, setNotes] = useState("")
  const [files, setFiles] = useState<File[]>([])
  const [uploadPct, setUploadPct] = useState(0)
  const [message, setMessage] = useState<Message>({
    message: "",
    messageStatus: "success",
  })
  const submitEl = useRef(null)

  const submit = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault()
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
          notes,
          setUploadStep,
          setUploadPct
        )

      // Create product on smart contract
      const productPrice = isUSD ? Math.floor(usdValue * 100) : ethValue

      const eventLogs = await handleSubmit(
        AddProduct(
          slicerId,
          0,
          productPrice,
          isUSD,
          isMultiple,
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

      if (success) {
        setLogs(eventLogs)
        setUploadStep(9)
        await handleSuccess(slicerId, newProduct.id, eventLogs)
        setUploadStep(10)
      } else {
        setUploadStep(7)
        await handleReject(
          slicerId,
          image,
          data,
          purchaseDataCID,
          newProduct.id
        )
        setUploadStep(8)
      }
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }

  useEffect(() => {
    console.log(uploadPct)
  }, [uploadPct])

  useEffect(() => {
    if (uploadStep != 0) {
      setModalView({
        cross: false,
        name: `CREATE_PRODUCT_VIEW`,
        params: { loading, uploadStep },
      })
    }
  }, [loading, uploadStep])

  useEffect(() => {
    setUploadStep(5)
    setModalView("CREATE_PRODUCT_VIEW")
  }, [])

  return (
    <form className="w-full max-w-sm py-6 mx-auto space-y-6" onSubmit={submit}>
      <AddProductFormGeneral
        slicerId={slicerId}
        newImage={newImage}
        setNewImage={setNewImage}
        name={name}
        description={description}
        loading={loading}
        setName={setName}
        setDescription={setDescription}
      />
      <AddProductFormPrice
        isMultiple={isMultiple}
        isLimited={isLimited}
        units={units}
        ethValue={ethValue}
        usdValue={usdValue}
        isUSD={isUSD}
        loading={loading}
        setIsMultiple={setIsMultiple}
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
      <div className="pb-1">
        <Button
          label="Create product"
          type="button"
          onClick={() =>
            setModalView({
              cross: true,
              name: "CREATE_PRODUCT_CONFIRM_VIEW",
              params: { submitEl, uploadStep, setModalView },
            })
          }
        />
        <button className="hidden" ref={submitEl} type="submit" />
      </div>
      <div>
        <MessageBlock msg={message} />
      </div>
    </form>
  )
}

export default AddProductForm

// Todo: textarea Input

// Todo: What else to add to data and purchaseData (on pinata and web3storage)

// Todo: Use Uploadpct
