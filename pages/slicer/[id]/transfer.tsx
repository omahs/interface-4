import {
  ActionScreen,
  ConnectBlock,
  DoubleText,
  TransferForm,
} from "@components/ui"
import fetcher from "@utils/fetcher"
import { GetStaticPropsContext, InferGetStaticPropsType } from "next"

const Transfer = ({
  slicerInfo,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <ConnectBlock>
      <main className="max-w-[420px] mx-auto sm:max-w-screen-md">
        <DoubleText
          inactive
          logoText="Transfer"
          size="text-4xl sm:text-5xl"
          position="pb-12"
        />
        {slicerInfo?.id !== null ? (
          <TransferForm slicerId={slicerInfo?.id} />
        ) : (
          <ActionScreen
            text="This slicer doesn't exist (yet)"
            href="/"
            buttonLabel="Return to home"
          />
        )}
      </main>
    </ConnectBlock>
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

export default Transfer
