import { Container, DoubleText, SlicersGrid } from "@components/ui"
import fetcher from "@utils/fetcher"
import { GetStaticPropsContext, InferGetStaticPropsType } from "next"
import { NextSeo } from "next-seo"

const Slicer = ({
  totalSlicers,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Container page={true}>
      <NextSeo title="Slicers" />
      <main className="max-w-[420px] mx-auto sm:max-w-screen-lg">
        <DoubleText
          inactive
          logoText="Slicers"
          size="text-4xl sm:text-5xl"
          position="pb-12"
        />
        <SlicersGrid totalSlicers={Number(totalSlicers)} />
      </main>
    </Container>
  )
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL

  try {
    const { totalSlicers } = await fetcher(`${baseUrl}/api/slicer/total`)

    return {
      props: {
        totalSlicers,
      },
      revalidate: 10,
    }
  } catch (err) {
    throw err
  }
}

export default Slicer
