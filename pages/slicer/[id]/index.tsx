import { GetStaticPropsContext, InferGetStaticPropsType } from "next"
import {
  CopyAddress,
  DoubleText,
  SlicerImage,
  ActionScreen,
  Button,
  SlicerDescription,
} from "@components/ui"
import fetcher from "@utils/fetcher"
import { useAllowed } from "@lib/useProvider"
import Edit from "@components/icons/Edit"
import { useState } from "react"

const Id = ({ slicerInfo }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const isAllowed = useAllowed(slicerInfo?.id)
  const [editMode, setEditMode] = useState(false)
  const [loading, setLoading] = useState(false)

  const [slicer, setSlicer] = useState({
    name: slicerInfo?.name,
    description: slicerInfo?.description,
    imageUrl: slicerInfo?.imageUrl,
  })
  const [newDescription, setNewDescription] = useState(slicer.description)
  const [newName, setNewName] = useState(slicer.name)
  const [newImageUrl, setNewImageUrl] = useState(slicer.imageUrl)

  const save = async () => {
    const newInfo = {
      description: newDescription,
      name: newName,
      imageUrl: newImageUrl,
    }
    setLoading(true)
    setSlicer(newInfo)
    const body = {
      method: "POST",
      body: JSON.stringify(newInfo),
    }
    await fetcher(`/api/slicer/${slicerInfo?.id}`, body)
    setEditMode(false)
    setLoading(false)
  }

  const cancel = () => {
    setNewDescription(slicer.description)
    setEditMode(false)
  }

  return slicerInfo?.id !== null ? (
    <main className="max-w-screen-sm">
      <div>
        <div className="inline-block pb-4">
          <div className="relative flex items-center justify-center">
            <p className="inline-block text-lg font-extrabold uppercase">
              Slicer
            </p>
            {isAllowed && !editMode && (
              <div
                className="cursor-pointer absolute right-[-38px] inline-block hover:text-yellow-500"
                onClick={() => {
                  setEditMode(true)
                }}
              >
                <Edit />
              </div>
            )}
          </div>
        </div>
      </div>
      <DoubleText
        inactive
        logoText={slicer.name}
        size="text-4xl sm:text-6xl"
        position="pb-6"
      />
      <div className="pt-2 pb-10">
        <CopyAddress slicerAddress={slicerInfo?.address} />
        <SlicerDescription
          description={slicer.description}
          newDescription={newDescription}
          setNewDescription={setNewDescription}
          editMode={editMode}
        />
      </div>
      <SlicerImage name={slicer.name} imageUrl={slicer.imageUrl} />
      {editMode && (
        <>
          <div className="pt-10 pb-8">
            <Button label="Save" onClick={() => save()} loading={loading} />
          </div>
          {!loading && (
            <p
              className="inline-block font-medium text-red-600 cursor-pointer hover:underline"
              onClick={() => cancel()}
            >
              Cancel
            </p>
          )}
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
    const { slicerInfo } = await fetcher(`${baseUrl}/api/slicer/${id}`)
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
