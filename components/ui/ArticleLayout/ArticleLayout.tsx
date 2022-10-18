import Head from "next/head"
import Image from "next/image"
import { useEffect } from "react"

import { Back, Container } from "@components/ui"
import { NextSeo } from "next-seo"
import { domain } from "@components/common/Head"

export default function Article({
  htmlTitle,
  title,
  subtitle,
  slug,
  author,
  authorLink,
  ogImage,
  coverImage,
  children,
}) {
  useEffect(() => {
    const script = document.createElement("script")
    script.setAttribute("src", "https://platform.twitter.com/widgets.js")
    script.setAttribute("async", "")
    script.setAttribute("charset", "utf-8")
    document.body.appendChild(script)
  }, [])

  return (
    <>
      <Container page={true}>
        <NextSeo
          title={htmlTitle || title}
          description={subtitle}
          titleTemplate="%s | Slice Blog"
          openGraph={{
            title: `${htmlTitle || title} | Slice blog`,
            description: subtitle,
            url: `${domain}/blog/${slug}`,
            images: [
              {
                url: ogImage
                  ? `${domain}/blog/${ogImage}`
                  : `${domain}/og_image.jpg`,
                alt: `${slug} blog post cover image`,
              },
            ],
          }}
        />
        <Head>
          <meta
            name="twitter:image"
            content={
              coverImage
                ? `${domain}/blog/${coverImage}`
                : `${domain}/twitter_card.png`
            }
          />
        </Head>

        <section className="max-w-screen-sm pb-10 mx-auto text-left">
          <Back />
          <div className="py-4">
            <h1 className="pb-2 text-3xl sm:text-4xl">{title}</h1>
            <h2 className="text-lg font-normal">{subtitle}</h2>
            {author && (
              <p className="pt-3 text-sm text-gray-500">
                by{" "}
                {authorLink ? (
                  <a
                    href={authorLink}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-gray-600"
                  >
                    {author}
                  </a>
                ) : (
                  author
                )}
              </p>
            )}
          </div>
          {coverImage ? (
            <div
              className="relative max-h-[53.35vw] sm:max-h-[360px] h-screen mt-5 mb-10 overflow-hidden rounded-xl box-content"
              style={{ aspectRatio: "16 / 9" }}
            >
              <Image
                src={`${domain}/blog/${coverImage}`}
                alt={`Cover image of ${slug} post`}
                layout="fill"
                objectFit="cover"
              />
            </div>
          ) : null}

          <article className="prose">{children}</article>
        </section>
      </Container>
    </>
  )
}

// coverImage needs to be 16/9 aspect ratio
