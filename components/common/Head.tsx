import { FC } from "react"
import NextHead from "next/head"
import { DefaultSeo } from "next-seo"

const title = "Slice Series"
const description =
  "Easily turn your course, newsletter, book or manga into a digital serie. Subscribe now for early access."
const domain = "series.slice.so"
const accounts = { twitter: "@slice__so" }

const Head: FC = () => {
  return (
    <>
      <DefaultSeo
        titleTemplate={`%s | ${title}`}
        defaultTitle={title}
        description={description}
        openGraph={{
          title: title,
          description: description,
          type: `website`,
          locale: `en_US`,
          url: `https://${domain}`,
          site_name: title,
          images: [
            {
              url: `https://${domain}/og_image.jpg`,
              width: 1000,
              height: 1000,
              alt: `${title} cover image`,
            },
            {
              url: `https://${domain}/og_image_default.jpg`,
              width: 1000,
              height: 1000,
              alt: `${title} cover image`,
            },
          ],
        }}
        twitter={{
          handle: accounts.twitter,
          site: accounts.twitter,
          cardType: "summary_large_image",
        }}
      />
      <NextHead>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="twitter:image"
          content={`https://${domain}/twitter_card.jpg`}
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </NextHead>
    </>
  )
}

export default Head
