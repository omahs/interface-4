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
                url: coverImage
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
                : `${domain}/twitter_card.jpg`
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
            <div className="relative mt-5 mb-8 rounded-xl overflow-hidden height-[40vw] max-height-[270px]">
              <Image
                src={coverImage}
                alt={`Cover image of ${slug} post`}
                layout="fill"
                className="object-cover"
              />
            </div>
          ) : null}

          <article className="prose">{children}</article>
        </section>
      </Container>
    </>
  )
}
