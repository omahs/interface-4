import { GetStaticPropsContext, InferGetStaticPropsType } from "next"
import {
  ActionScreen,
  Button,
  CopyAddress,
  DoubleText,
  SlicerDescription,
  SlicerName,
  SlicerImage,
  MessageBlock,
} from "@components/ui"
import fetcher from "@utils/fetcher"
import { useAllowed } from "@lib/useProvider"
import Edit from "@components/icons/Edit"
import { useState } from "react"
import handleMessage, { Message } from "@utils/handleMessage"

export type NewImage = { url: string; file: File }

const Id = ({ slicerInfo }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const isAllowed = useAllowed(slicerInfo?.id)
  const [editMode, setEditMode] = useState(false)
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState<Message>({
    message: "",
    messageStatus: "success",
  })

  const [slicer, setSlicer] = useState({
    name: slicerInfo?.name,
    description: slicerInfo?.description,
    imageUrl: slicerInfo?.imageUrl,
  })
  const [newDescription, setNewDescription] = useState(slicer.description)
  const [newName, setNewName] = useState(slicer.name)
  const [newImage, setNewImage] = useState<NewImage>({
    url: "",
    file: undefined,
  })
  const [tempImageUrl, setTempImageUrl] = useState("")

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
      if (newImage.url) {
        setTempImageUrl(newImage.url)
        const fileExt = newImage.file.name.split(".").pop()
        const reader = new FileReader()

        reader.onload = async () => {
          const buffer = reader.result
          const body = {
            method: slicerInfo.imageUrl ? "PUT" : "POST",
            body: JSON.stringify({ buffer, fileExt }),
          }
          const { Key, error } = await fetcher(
            `/api/slicer/${slicerInfo?.id}/upload_file`,
            body
          )
          if (error) {
            throw Error(error)
          }
          if (!slicerInfo.imageUrl) {
            const newFilePath = `${supabaseUrl}/storage/v1/object/public/${Key}`
            newInfo = {
              description: newDescription,
              name: newName,
              imageUrl: newFilePath,
            }
          }
          await updateDb(newInfo)
          setNewImage({ url: "", file: undefined })
          setEditMode(false)
          setLoading(false)
        }

        reader.readAsBinaryString(newImage.file)
      } else {
        await updateDb(newInfo)
        setEditMode(false)
        setLoading(false)
      }
    } catch (err) {
      setLoading(false)
      console.log(err)
      handleMessage(
        {
          message: "Something has gone wrong, try again",
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

  return slicerInfo?.id !== null ? (
    <main className="w-full max-w-screen-sm mx-auto">
      <div>
        <div className="inline-block pb-2">
          <div className="relative flex items-center justify-center">
            <p className="inline-block text-lg font-bold uppercase">Slicer</p>
            {isAllowed && !editMode && (
              <div
                className="cursor-pointer absolute right-[-35px] inline-block hover:text-yellow-500"
                onClick={() => {
                  setEditMode(true)
                }}
              >
                <Edit className="w-6 h-6" />
              </div>
            )}
          </div>
        </div>
        <div className={`${isAllowed ? "pt-5 " : ""}pb-8`}>
          <CopyAddress slicerAddress={slicerInfo?.address} />
        </div>
      </div>
      <DoubleText
        inactive
        logoText={slicer.name || "Slicer"}
        size="text-3xl sm:text-5xl"
        position=""
      />
      <div className="pt-6 pb-6">
        <SlicerName
          name={slicer.name}
          newName={newName}
          setNewName={setNewName}
          editMode={editMode}
          loading={loading}
        />
        <SlicerDescription
          description={slicer.description}
          newDescription={newDescription}
          setNewDescription={setNewDescription}
          editMode={editMode}
          loading={loading}
        />
      </div>
      <SlicerImage
        name={slicer.name}
        imageUrl={slicer.imageUrl}
        newImage={newImage}
        setNewImage={setNewImage}
        tempImageUrl={tempImageUrl}
        editMode={editMode}
        setMsg={setMsg}
        loading={loading}
      />
      {editMode && (
        <>
          <div className="pt-10 pb-8">
            <Button label="Save" loading={loading} onClick={() => save()} />
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
        </>
      )}
    </main>
  ) : (
    <ActionScreen
      text="This slicer doesn't exist (yet)"
      href="/"
      buttonLabel="Return to home"
    />
  )
}

export async function getStaticPaths() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  const { totalSlicers } = await fetcher(`${baseUrl}/api/slicer`)
  const paths = [...Array(totalSlicers).keys()].map((slicerId) => {
    const id = String(slicerId)
    return {
      params: {
        id,
      },
    }
  })

  return { paths, fallback: true }
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  const id = context.params.id

  try {
    const slicerInfo = await fetcher(`${baseUrl}/api/slicer/${id}`)
    return {
      props: {
        slicerInfo,
      },
      revalidate: 10,
    }
  } catch (err) {
    throw err
  }
}

export default Id
