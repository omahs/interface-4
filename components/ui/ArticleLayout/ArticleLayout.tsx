import Head from "next/head"
import Image from "next/image"
import { useEffect } from "react"

import { Back, Container } from "@components/ui"
import { NextSeo } from "next-seo"
import { domain } from "@components/common/Head"

export default function Article(props) {
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
          title={props.htmlTitle || props.title}
          description={props.subtitle}
          titleTemplate="%s | Slice Blog"
          openGraph={{
            title: `${props.htmlTitle || props.title} | Slice blog`,
            description: props.subtitle,
            url: `${domain}/blog/${props.slug}`,
            images: [
              {
                url: `${domain}/blog/${props.coverImage}`,
                alt: `${props.slug} blog post cover image`,
              },
            ],
          }}
        />
        <Head>
          <meta
            name="twitter:image"
            content={`${domain}/${props.coverImage}`}
          />
        </Head>

        <section className="max-w-screen-sm pb-10 mx-auto text-left">
          <Back />
          <div className="py-4">
            <h1 className="pb-1 text-3xl">{props.title}</h1>
            <h2 className="text-lg font-normal">{props.subtitle}</h2>
          </div>
          {props.coverImage ? (
            <div className="relative mt-5 mb-8 rounded-xl overflow-hidden height-[40vw] max-height-[270px]">
              <Image
                src={props.coverImage}
                alt={`Cover image of ${props.slug} post`}
                layout="fill"
                className="object-cover"
              />
            </div>
          ) : null}

          <article className="prose">{props.children}</article>
        </section>
      </Container>
    </>
  )
}
