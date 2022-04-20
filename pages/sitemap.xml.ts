import { domain } from "@components/common/Head"
import { sliceCore } from "@lib/initProvider"
import { defaultProvider } from "@lib/useProvider"
import { GetServerSideProps } from "next"

function generateSiteMap(totalSlicers) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
        <loc>${domain}</loc>
      </url>
      <url>
        <loc>${domain}/slicer</loc>
      </url>
     ${[...Array(totalSlicers)]
       .map((el, key) => {
         const slicerId = Number(key)
         return `
       <url>
           <loc>${`${domain}/slicer/${slicerId}`}</loc>
       </url>
     `
       })
       .join("")}
   </urlset>
 `
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const totalSlicers = await sliceCore(defaultProvider).supply()

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(Number(totalSlicers))

  res.setHeader("Content-Type", "text/xml")
  // we send the XML to the browser
  res.write(sitemap)
  res.end()

  return {
    props: {}
  }
}

export default SiteMap
