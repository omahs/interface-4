import { Container, DoubleText } from "@components/ui"
import { NextSeo } from "next-seo"
import { defaultTitle, domain } from "@components/common/Head"
import Link from "next/link"
import { getAllPosts } from "../api/getPosts"

export default function Blog({ allPosts }) {
  return (
    <>
      <Container page={true}>
        <NextSeo
          title="Blog"
          openGraph={{
            title: "Slice blog",
            description: "Behind the scenes of the Slice project",
            url: `${domain}/blog`,
            images: [
              {
                url: `${domain}/og_image.jpg`,
                width: 1000,
                height: 1000,
                alt: `${defaultTitle} cover image`
              }
            ]
          }}
        />

        <section className="max-w-screen-sm pt-2 mx-auto text-left">
          <h1 className="pb-20 text-center">
            <DoubleText
              inactive
              logoText="Slice blog"
              size="text-5xl sm:text-6xl"
            />
          </h1>
          <main className="">
            <ul>
              {allPosts.map((post, key) => {
                return (
                  <li key={key}>
                    <Link href={`/blog/${encodeURIComponent(post.slug)}`}>
                      <a>
                        <p className="text-xl font-black sm:text-2xl">
                          {post.title}
                        </p>
                        <p className="pt-1.5 font-normal">{post.subtitle}</p>
                      </a>
                    </Link>
                    <hr className="mx-auto my-8 border-gray-300" />
                  </li>
                )
              })}
            </ul>
          </main>
        </section>
      </Container>
    </>
  )
}

export async function getStaticProps() {
  const allPosts = getAllPosts(["title", "subtitle", "slug", "date"])

  return {
    props: { allPosts }
  }
}
