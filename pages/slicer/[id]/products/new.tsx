import { ConnectBlock, Container, DoubleText } from "@components/ui"
import { NextSeo } from "next-seo"
import {
  defaultDescription,
  defaultTitle,
  longTitle,
  domain,
} from "@components/common/Head"
import { useAllowed } from "@lib/useProvider"
import { useRouter } from "next/dist/client/router"

export default function NewProduct() {
  const router = useRouter()
  const { id } = router.query
  const { state, loading } = useAllowed(Number(id))

  return (
    <Container page={true}>
      <NextSeo
        title="Add a new product"
        openGraph={{
          title: longTitle,
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
      <ConnectBlock>
        {loading ? (
          <p>Loading</p>
        ) : state ? (
          <main className="max-w-[420px] mx-auto sm:max-w-screen-md">
            <DoubleText
              inactive
              logoText="Add a new product"
              size="text-4xl sm:text-5xl"
              position="pb-12"
            />
          </main>
        ) : (
          <p>Not allowed</p>
        )}
      </ConnectBlock>
    </Container>
  )
}

// Todo: This page
