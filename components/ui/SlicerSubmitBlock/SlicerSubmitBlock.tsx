import { Dispatch, SetStateAction, useEffect, useState } from "react"
import useSWR, { mutate } from "swr"
import { NewImage, SlicerData } from "pages/slicer/[id]"
import fetcher from "@utils/fetcher"
import handleMessage, { Message } from "@utils/handleMessage"
import { defaultProvider } from "@lib/useProvider"
import { slicer as slicerContract } from "@lib/initProvider"
import { useAppContext } from "../context"
import { PaySlicer, Button, MessageBlock } from "@components/ui"
import supabase from "lib/supabase"
import supabaseUpload from "@utils/supabaseUpload"
const reduce = require("image-blob-reduce")()

type Props = {
  editMode: boolean
  setEditMode: Dispatch<SetStateAction<boolean>>
  slicerInfo: any
  slicer: SlicerData
  setSlicer: Dispatch<SetStateAction<SlicerData>>
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
  newName: any
  setNewName: Dispatch<SetStateAction<any>>
  newDescription: any
  setNewDescription: Dispatch<SetStateAction<any>>
  newImage: NewImage
  setNewImage: Dispatch<SetStateAction<NewImage>>
  setTempImageUrl: Dispatch<SetStateAction<string>>
  msg: Message
  setMsg: Dispatch<SetStateAction<Message>>
}

const SlicerSubmitBlock = ({
  editMode,
  setEditMode,
  slicerInfo,
  slicer,
  setSlicer,
  loading,
  setLoading,
  newName,
  setNewName,
  newDescription,
  setNewDescription,
  newImage,
  setNewImage,
  setTempImageUrl,
  msg,
  setMsg,
}: Props) => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const { data: slicerInfoUpdated } = useSWR(
    editMode ? `/api/slicer/${slicerInfo?.id}?stats=false` : null,
    fetcher
  )

  const { account, setModalView } = useAppContext()
  const [preventSubmit, setPreventSubmit] = useState(false)
  const [tempStorageUrl, setTempStorageUrl] = useState("")

  const openPopup = () => {
    setModalView({ name: "IRREVERSIBLE_VIEW" })
    setPreventSubmit(false)
  }

  const updateDb = async (newInfo) => {
    setSlicer(newInfo)
    const body = {
      method: "POST",
      body: JSON.stringify(newInfo),
    }
    await fetcher(`/api/slicer/${slicerInfo?.id}`, body)
  }

  const save = async () => {
    setLoading(true)
    let newInfo = {
      description: newDescription,
      name: newName,
      imageUrl: slicer.imageUrl,
    }
    try {
      const contract = await slicerContract(slicerInfo?.id, defaultProvider)
      const isPayeeAllowed = await contract.isPayeeAllowed(account)
      if (!isPayeeAllowed) {
        throw Error("Payee is not allowed")
      }
      if (newImage.url) {
        setTempImageUrl(newImage.url)

        const { Key } = await supabaseUpload(
          `${slicerInfo?.id}/main`,
          newImage,
          slicer.imageUrl,
          slicerInfo?.isCollectible
        )

        const newFilePath = `${supabaseUrl}/storage/v1/object/public/${Key}`
        setTempStorageUrl(newFilePath)
        newInfo = {
          description: newDescription,
          name: newName,
          imageUrl: newFilePath,
        }
        await updateDb(newInfo)
        mutate(`/api/slicer/${slicerInfo?.id}?stats=false`)
        setNewImage({ url: "", file: undefined })
        setEditMode(false)
        setLoading(false)
      } else {
        await updateDb(newInfo)
        setEditMode(false)
        setLoading(false)
      }
    } catch (err) {
      console.log(err.message)
      setLoading(false)
      handleMessage(
        {
          message:
            err.message === "Payee is not allowed"
              ? err.message
              : "Something went wrong, try again",
          messageStatus: "error",
        },
        setMsg
      )
    }
  }

  const cancel = () => {
    setNewName(slicer.name)
    setNewDescription(slicer.description)
    setNewImage({ url: "", file: undefined })
    setEditMode(false)
  }

  useEffect(() => {
    if (slicerInfo?.isCollectible) {
      setPreventSubmit(true)
    }
  }, [slicerInfo])

  useEffect(() => {
    if (!tempStorageUrl && slicerInfoUpdated?.imageUrl) {
      setTempStorageUrl(slicerInfoUpdated?.imageUrl)
    }
  }, [slicerInfoUpdated])

  return !editMode ? (
    <PaySlicer slicerAddress={slicerInfo?.address} />
  ) : (
    <div>
      <p className="pb-8 mx-auto max-w-screen-xs">
        <strong>Note:</strong> Edits will appear after around 10 seconds.
        Refresh the page a couple of times to see them.
      </p>
      <div className="pb-8">
        <Button
          label="Save"
          loading={loading}
          onClick={() => (preventSubmit ? openPopup() : save())}
        />
      </div>
      {!loading && (
        <p
          className="inline-block font-medium text-red-600 cursor-pointer hover:underline"
          onClick={() => cancel()}
        >
          Cancel
        </p>
      )}
      <MessageBlock msg={msg} />
    </div>
  )
}

export default SlicerSubmitBlock
