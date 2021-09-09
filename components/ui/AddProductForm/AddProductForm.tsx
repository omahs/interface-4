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
import fetcher from "@utils/fetcher"
import { Bytes32FromIpfsHash, IpfsHashFromBytes32 } from "@utils/convertBytes"

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
    let image = ""
    let hash = ""
    setLoading(true)
    try {
      if (!productId) {
        throw Error("An unexpected error occurred. Try again")
      }
      // if (...) {

      // save image on supabase
      if (newImage.url) {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
        {
          const { Key } = await supabaseUpload(
            `${slicerId}/product_${productId}`,
            newImage
          )
          image = `${supabaseUrl}/storage/v1/object/public/${Key}`
        }
      }

      // Pin metadata on pinata
      const metadata = { name, description, image }
      const pinBody = {
        body: JSON.stringify({ metadata, slicerId, productId }),
        method: "POST",
      }
      const { IpfsHash } = await fetcher("/api/pin_json", pinBody)
      hash = IpfsHash

      // save metadata, hash & imageUrl on prisma
      const body = {
        method: "POST",
        body: JSON.stringify({
          productId,
          name,
          description,
          image,
          hash,
        }),
      }
      await fetcher(`/api/slicer/${slicerId}/createProduct`, body)

      // create product on smart contract
      const productPrice = isUSD ? Math.floor(usdValue * 100) : ethValue
      const bytes32Hash = Bytes32FromIpfsHash(hash)

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
      // Todo: Test this
      // unpin
      if (hash) {
        const unpinBody = {
          body: JSON.stringify({ hash }),
          method: "POST",
        }
        hash = await fetcher("/api/unpin", unpinBody)
      }
      // delete image from supabase
      if (image) {
        const currentImageName = image.split("/").pop()
        const body = {
          method: "POST",
          body: JSON.stringify({
            url: currentImageName,
          }),
        }
        await fetcher(`/api/slicer/delete_file`, body)
      }
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
