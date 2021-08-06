import {
  ConnectBlock,
  Container,
  DoubleText,
  SlicersList,
} from "@components/ui"
import { NextSeo } from "next-seo"
import {
  defaultDescription,
  defaultTitle,
  longTitle,
  domain,
} from "@components/common/Head"

export default function Profile() {
  return (
    <Container page={true}>
      <NextSeo
        title="Your slicers"
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
        <main className="max-w-[420px] mx-auto sm:max-w-screen-md">
          <DoubleText
            inactive
            logoText="Your slicers"
            size="text-4xl sm:text-5xl"
            position="pb-12"
          />
          <div className="space-y-4 text-left">
            <SlicersList />
          </div>
        </main>
      </ConnectBlock>
    </Container>
  )
}
