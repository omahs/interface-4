import Head from "next/head"
import { GetStaticPropsContext, InferGetStaticPropsType } from "next"
import {
  ActionScreen,
  Button,
  CopyAddress,
  DoubleText,
  PaySlicer,
  SlicerTags,
  SlicerDescription,
  SlicerName,
  SlicerImageBlock,
  MessageBlock,
  Container,
} from "@components/ui"
import fetcher from "@utils/fetcher"
import { defaultProvider, useAllowed } from "@lib/useProvider"
import Edit from "@components/icons/Edit"
import { useEffect, useState } from "react"
import handleMessage, { Message } from "@utils/handleMessage"
import { NextSeo } from "next-seo"
import { domain } from "@components/common/Head"
import useSWR, { mutate } from "swr"

import { slicer as slicerContract } from "@lib/initProvider"
import { useAppContext } from "@components/ui/context"

export type NewImage = { url: string; file: File }
export type SlicerAttributes = {
  Creator: string
  "Minimum slices": number
  "Sliced on": number
  "Total slices": number
}

const initAttributes = {
  Creator: "",
  "Minimum slices": 0,
  "Sliced on": 0,
  "Total slices": 0,
}

const Id = ({ slicerInfo }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { account } = useAppContext()
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
    imageUrl: slicerInfo?.image,
  })
  const [slicerAttributes, setSlicerAttributes] =
    useState<SlicerAttributes>(initAttributes)

  const [newDescription, setNewDescription] = useState(slicer.description)
  const [newName, setNewName] = useState(slicer.name)
  const [newImage, setNewImage] = useState<NewImage>({
    url: "",
    file: undefined,
  })
  const [tempImageUrl, setTempImageUrl] = useState("")
  const [tempStorageUrl, setTempStorageUrl] = useState("")
  const pageTitle =
    slicer.name === `Slicer #${slicerInfo?.id}`
      ? slicer.name
      : `${slicer.name} | Slicer #${slicerInfo?.id}`

  const { data: slicerInfoUpdated } = useSWR(
    editMode ? `/api/slicer/${slicerInfo?.id}?stats=false` : null,
    fetcher
  )

  useEffect(() => {
    if (!tempStorageUrl && slicerInfoUpdated?.imageUrl) {
      setTempStorageUrl(slicerInfoUpdated?.imageUrl)
    }
  }, [slicerInfoUpdated])

  useEffect(() => {
    let attr = initAttributes
    slicerInfo?.attributes.map((el) => {
      attr[el.trait_type] = el.value
    })
    setSlicerAttributes(attr)
  }, [slicerInfo])

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
        const fileExt = newImage.file.name.split(".").pop()
        const reader = new FileReader()

        reader.onload = async () => {
          const buffer = reader.result
          const body = {
            method: "POST",
            body: JSON.stringify({
              buffer,
              fileExt,
              currentUrl: tempStorageUrl || slicerInfo.image || null,
            }),
          }
          const { Key, error } = await fetcher(
            `/api/slicer/${slicerInfo?.id}/upload_file`,
            body
          )
          if (error) {
            throw Error(error)
          }
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
        }

        reader.readAsBinaryString(newImage.file)
      } else {
        await updateDb(newInfo)
        setEditMode(false)
        setLoading(false)
      }
    } catch (err) {
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

  return (
    <Container page={true}>
      {slicerInfo?.id !== null ? (
        <main className="w-full max-w-screen-sm mx-auto space-y-8 sm:space-y-10">
          {slicer.name != undefined && (
            <>
              <NextSeo
                title={pageTitle}
                openGraph={{
                  title: pageTitle,
                  description: slicer.description,
                  url: `https://${domain}/slicer/${slicerInfo?.id}`,
                  images: [
                    {
                      url: slicer.imageUrl,
                      alt: `${slicer.name} cover image`,
                    },
                    {
                      url: `https://slice.so/og_image.jpg`,
                      alt: `${slicer.name} cover image`,
                    },
                  ],
                }}
              />
              {slicer.imageUrl && (
                <Head>
                  <meta name="twitter:image" content={slicer.imageUrl} />
                </Head>
              )}
            </>
          )}
          <div>
            <div className="pl-2.5 pb-5">
              <CopyAddress slicerAddress={slicerInfo?.address} />
            </div>
            <span className="relative">
              <DoubleText
                inactive
                logoText={slicer.name || `Slicer #${slicerInfo?.id}`}
                size="text-3xl sm:text-5xl"
                position=""
              />
              {isAllowed && !editMode && (
                <div
                  className="cursor-pointer absolute bottom-0 pb-0.5 sm:pb-1.5 right-[-38px] sm:right-[-43px] inline-block hover:text-yellow-500"
                  onClick={() => {
                    setEditMode(true)
                  }}
                >
                  <Edit className="w-6 h-6" />
                </div>
              )}
            </span>
          </div>
          <div>
            <SlicerName
              name={slicer.name}
              newName={newName}
              setNewName={setNewName}
              editMode={editMode}
              loading={loading}
            />
            {/* <SlicerTags
          description={slicer.description}
          newDescription={newDescription}
          setNewDescription={setNewDescription}
          editMode={editMode}
          loading={loading}
        /> */}
            <SlicerDescription
              description={slicer.description}
              newDescription={newDescription}
              setNewDescription={setNewDescription}
              editMode={editMode}
              loading={loading}
            />
          </div>
          <SlicerImageBlock
            name={slicer.name}
            imageUrl={slicer.imageUrl}
            newImage={newImage}
            setNewImage={setNewImage}
            tempImageUrl={tempImageUrl}
            editMode={editMode}
            setMsg={setMsg}
            loading={loading}
          />
          {!editMode ? (
            <PaySlicer slicerAddress={slicerInfo?.address} />
          ) : (
            <div>
              <p className="pb-8 mx-auto max-w-screen-xs">
                <strong>Note:</strong> Edits will appear after around 10
                seconds. Refresh the page a couple of times to see them.
              </p>
              <div className="pb-8">
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
            </div>
          )}
        </main>
      ) : (
        <ActionScreen
          text="This slicer doesn't exist (yet)"
          href="/"
          buttonLabel="Return to home"
        />
      )}
    </Container>
  )
}

export async function getStaticPaths() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  const { totalSlicers } = await fetcher(`${baseUrl}/api/slicer/total`)
  // const totalSlicers = 0
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

  const slicerInfo = await fetcher(`${baseUrl}/api/slicer/${id}?stats=false`)
  return {
    props: {
      slicerInfo,
    },
    revalidate: 10,
  }
}

export default Id
