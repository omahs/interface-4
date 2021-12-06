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
                alt: `${defaultTitle} cover image`,
              },
            ],
          }}
        />

        <section className="max-w-screen-sm pt-2 mx-auto text-left">
          <div className="py-6 sm:pt-10">
            <h1 className="py-3 text-center">
              <DoubleText
                inactive
                logoText={`Slice blog`}
                size="text-5xl sm:text-6xl"
              />
            </h1>
          </div>
          <main className="description">
            <ul>
              {allPosts.map((post, key) => {
                return (
                  <li key={key}>
                    <p>
                      <Link href={`/blog/${encodeURIComponent(post.slug)}`}>
                        <a className="font-medium">{post.title}</a>
                      </Link>
                      : {post.subtitle}
                    </p>
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
  const allPosts = getAllPosts(["title", "subtitle", "slug"])

  return {
    props: { allPosts },
  }
}

// TODO: fix spacing
