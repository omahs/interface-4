import { useState, Dispatch, SetStateAction, useEffect, useRef } from "react"
import {
  Button,
  MessageBlock,
  AddProductFormPrice,
  AddProductFormGeneral,
  AddProductFormPurchases,
  AddProductFormPreview
} from "@components/ui"
import { Message } from "@utils/handleMessage"
import { LogDescription } from "ethers/lib/utils"
import { NewImage } from "pages/slicer/[id]"
import { useAppContext } from "../context"
import { ProductParamsStruct } from "types/typechain/ProductsModule"
import { FunctionStruct } from "types/typechain/ProductsModule"
import { ethers } from "ethers"
import AddProductFormExternal from "../AddProductFormExternal"
import ethToWei from "@utils/ethToWei"

type Props = {
  slicerId: number
  success: boolean
  loading: boolean
  uploadStep: number
  setLoading: Dispatch<SetStateAction<boolean>>
  setUploadStep: Dispatch<SetStateAction<number>>
  setUploadPct: Dispatch<SetStateAction<number>>
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
  setUploadPct,
  setSuccess,
  setLogs
}: Props) => {
  const { account, setModalView, connector } = useAppContext()
  const [usdValue, setUsdValue] = useState(0)
  const [ethValue, setEthValue] = useState(0)
  const [name, setName] = useState("")
  const [shortDescription, setShortDescription] = useState("")
  const [description, setDescription] = useState("")
  const [newImage, setNewImage] = useState<NewImage>({
    url: "",
    file: undefined
  })
  const [isUSD, setIsUSD] = useState(false)
  const [isMultiple, setIsMultiple] = useState(false)
  const [isLimited, setIsLimited] = useState(false)
  const [isFree, setIsFree] = useState(false)
  const [units, setUnits] = useState(0)
  const [externalCall, setExternalCall] = useState<FunctionStruct>({
    data: [],
    value: 0,
    externalAddress: ethers.constants.AddressZero,
    checkFunctionSignature: "0x00000000",
    execFunctionSignature: "0x00000000"
  })
  const [thankMessage, setThankMessage] = useState("")
  const [instructions, setInstructions] = useState("")
  const [notes, setNotes] = useState("")
  const [files, setFiles] = useState<File[]>([])
  const [message, setMessage] = useState<Message>({
    message: "",
    messageStatus: "success"
  })
  const submitEl = useRef(null)

  const submit = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault()

    const { beforeCreate, handleReject, handleSuccess } = await import(
      "@lib/handleCreateProduct"
    )
    const { AddProduct } = await import("@lib/handlers/chain")
    const handleSubmit = (await import("@utils/handleSubmit")).default

    try {
      const { image, newProduct, data, purchaseDataCID, purchaseData } =
        await beforeCreate(
          account,
          slicerId,
          name,
          shortDescription,
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
      const weiValue = ethToWei(ethValue)
      const productPrice = isUSD ? Math.floor(usdValue * 100) : weiValue

      const currencyPrices =
        productPrice != 0
          ? [
              {
                currency: ethers.constants.AddressZero,
                value: productPrice,
                dynamicPricing: isUSD
              }
            ]
          : []

      const productParams: ProductParamsStruct = {
        subSlicerProducts: [],
        currencyPrices,
        data,
        purchaseData,
        availableUnits: units,
        isFree,
        isMultiple,
        isInfinite: !isLimited
      }

      const eventLogs = await handleSubmit(
        AddProduct(connector, slicerId, productParams, externalCall),
        setMessage,
        setLoading,
        setSuccess,
        true
      )

      if (eventLogs) {
        setLogs(eventLogs)
        setUploadStep(9)
        await handleSuccess(slicerId, newProduct.id, eventLogs)
        setModalView({ name: "" })
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
    if (ethValue != 0) {
      setIsFree(false)
    } else {
      setIsFree(true)
    }
  }, [ethValue, usdValue])

  return (
    <form className="w-full max-w-sm py-6 mx-auto space-y-6" onSubmit={submit}>
      <AddProductFormGeneral
        slicerId={slicerId}
        newImage={newImage}
        setNewImage={setNewImage}
        name={name}
        shortDescription={shortDescription}
        description={description}
        loading={loading}
        setName={setName}
        setDescription={setDescription}
        setShortDescription={setShortDescription}
      />
      <AddProductFormPrice
        isMultiple={isMultiple}
        isLimited={isLimited}
        isFree={isFree}
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
      <AddProductFormExternal
        externalCall={externalCall}
        setExternalCall={setExternalCall}
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
      <AddProductFormPreview
        slicerId={slicerId}
        name={name}
        shortDescription={shortDescription}
        description={description}
        newImage={newImage}
        isMultiple={isMultiple}
        isLimited={isLimited}
        units={units}
        ethValue={ethValue}
        usdValue={usdValue}
        isUSD={isUSD}
        thankMessage={thankMessage}
        instructions={instructions}
        notes={notes}
        files={files}
        setModalView={setModalView}
        externalCallValue={externalCall?.value}
      />
      <div className="pb-1">
        <Button
          label="Create product"
          type="button"
          onClick={() =>
            setModalView({
              cross: true,
              name: "CREATE_PRODUCT_CONFIRM_VIEW",
              params: { submitEl, uploadStep, setModalView }
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

// Todo: What else to add to data and purchaseData (on pinata and web3storage)
// tags?
