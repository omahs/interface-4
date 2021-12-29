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
      "localhost",
      "slice.so",
      "testnet.slice.so",
      "dev.slice.so",
      "tjqdcmrertmapvramecf.supabase.co",
      "irdzgezsxggqvykkylyj.supabase.co",
      "diaoluyyhxqydojrszqz.supabase.co",
      "api.producthunt.com",
      "",
    ],
  },
  experimental: {
    esmExternals: true,
  },
  pageExtensions: ["ts", "tsx", "md", "mdx"],
})
