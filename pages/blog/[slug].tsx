import { getAllPosts, getPostBySlug } from "../api/getPosts"
import markdownToHtml from "lib/markdownToHtml"

import { ArticleLayout } from "@components/ui"

export default function Doc({ post }) {
  return (
    <ArticleLayout
      htmlTitle={post.htmlTitle}
      title={post.title}
      slug={post.slug}
      subtitle={post.subtitle}
      author={post.author}
      authorLink={post.authorLink}
      ogImage={post.ogImage}
      coverImage={post.coverImage}
    >
      <main dangerouslySetInnerHTML={{ __html: post.content }}></main>
    </ArticleLayout>
  )
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, [
    "htmlTitle",
    "title",
    "subtitle",
    "date",
    "slug",
    "author",
    "authorLink",
    "content",
    "ogImage",
    "coverImage",
  ])
  const content = await markdownToHtml(post.content)

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"])

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}
