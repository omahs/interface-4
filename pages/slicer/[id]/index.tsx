import Image from "next/image"
import { GetStaticPropsContext, InferGetStaticPropsType } from "next"
import { useState, Dispatch, SetStateAction, useEffect } from "react"
import { Button, DoubleText, SliceFormBlockMetadata } from "@components/ui"
import fetcher from "@utils/fetcher"
import imageUrl from "public/og_image_default.jpg"

const Id = ({ slicerInfo }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  return (
    <main className="max-w-screen-sm">
      <p className="pb-4 text-lg font-extrabold uppercase">Slicer</p>
      <DoubleText
        inactive
        logoText={slicerInfo?.name}
        size="text-4xl sm:text-6xl"
        position="pb-8"
      />
      <div className="flex justify-center">
        <div className="flex max-w-sm overflow-hidden border-8 border-gray-800 rounded-xl">
          <Image
            src={imageUrl}
            alt={`${slicerInfo?.name} image`}
            placeholder="blur"
          />
        </div>
      </div>
      <SliceFormBlockMetadata
        setName={setName}
        setDescription={setDescription}
      />
    </main>
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
