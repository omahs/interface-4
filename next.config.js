const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

module.exports = withMDX({
  // swcMinify: true,
  images: {
    domains: [
      "irdzgezsxggqvykkylyj.supabase.co",
      "tjqdcmrertmapvramecf.supabase.co",
      "api.producthunt.com",
      "",
    ],
  },
  experimental: {
    esmExternals: true,
  },
  pageExtensions: ["ts", "tsx", "md", "mdx"],
})
