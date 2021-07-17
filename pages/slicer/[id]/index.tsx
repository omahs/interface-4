import { GetStaticPropsContext, InferGetStaticPropsType } from "next"
import {
  CopyAddress,
  DoubleText,
  SlicerImage,
  ActionScreen,
} from "@components/ui"
import fetcher from "@utils/fetcher"
import { useAllowed } from "@lib/useProvider"

const Id = ({ slicerInfo }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const isAllowed = useAllowed(slicerInfo?.id)

  return slicerInfo?.id !== null ? (
    <main className="max-w-screen-sm">
      <p className="pb-4 text-lg font-extrabold uppercase">Slicer</p>
      <DoubleText
        inactive
        logoText={slicerInfo?.name}
        size="text-4xl sm:text-6xl"
        position="pb-6"
      />
      <div className="pt-2 pb-10">
        <CopyAddress slicerAddress={slicerInfo?.address} />
        <p className="pt-8 text-xl font-semibold">{slicerInfo?.description}</p>
      </div>
      <SlicerImage slicerInfo={slicerInfo} />
    </main>
  ) : (
    <main className="max-w-screen-sm">
      <ActionScreen
        text="This slicer doesn't exist (yet)"
        href="/"
        buttonLabel="Return to home"
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
