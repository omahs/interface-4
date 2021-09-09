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
import useQuery from "@utils/subgraphQuery"
import { bytes32FromIpfsHash, ipfsHashFromBytes32 } from "@utils/convertBytes"
import { beforeCreate, handleReject } from "@lib/handleCreateProduct"

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
      const { hash, image, newProduct } = await beforeCreate(
        productId,
        slicerId,
        name,
        description,
        newImage
      )

      // Create product on smart contract
      const productPrice = isUSD ? Math.floor(usdValue * 100) : ethValue
      const bytes32Hash = bytes32FromIpfsHash(hash)

      const eventLogs = await handleSubmit(
        AddProduct(
          slicerId,
          0,
          productPrice,
          isUSD,
          !isSingle,
          !isLimited,
          units,
          bytes32Hash,
          purchaseData
        ),
        setMessage,
        setLoading,
        setSuccess,
        true
      )
      setLogs(eventLogs)

      if (!success) {
        await handleReject(slicerId, image, hash, newProduct.id)
      }
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

// Todo: Add dynamic loading states on submit (1. getting ready, 2. waiting for blockchain, 3. reverting)
// Todo: What else to add to metadata?
