import { Container, DoubleText, SlicersGrid } from "@components/ui"
import fetcher from "@utils/fetcher"
import { GetStaticPropsContext, InferGetStaticPropsType } from "next"
import { NextSeo } from "next-seo"
import {
  defaultDescription,
  defaultTitle,
  domain,
} from "@components/common/Head"
import { Slicer } from "@prisma/client"

const SlicerGrid = ({
  data,
  totalSlicers,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Container page={true}>
      <NextSeo
        title="Slicers"
        openGraph={{
          title: defaultTitle,
          description: defaultDescription,
          url: `https://${domain}`,
          images: [
            {
              url: `https://${domain}/og_image.jpg`,
              width: 1000,
              height: 1000,
              alt: `${defaultTitle} cover image`,
            },
          ],
        }}
      />
      <main className="max-w-[420px] mx-auto sm:max-w-screen-lg">
        <DoubleText
          inactive
          logoText="Slicers"
          size="text-4xl sm:text-5xl"
          position="pb-12"
        />
        <SlicersGrid data={data} totalSlicers={Number(totalSlicers)} />
      </main>
    </Container>
  )
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL

  try {
    const { totalSlicers } = await fetcher(`${baseUrl}/api/slicer/total`)
    const data: Slicer[] = await fetcher(
      `${baseUrl}/api/slicer?items=${totalSlicers}`
    )
    // const totalSlicers = 0

    return {
      props: {
        data,
        totalSlicers,
      },
      revalidate: 10,
    }
  } catch (err) {
    throw err
  }
}

export default SlicerGrid
