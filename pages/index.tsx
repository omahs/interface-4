import HomeCake from "@components/icons/HomeCake"
import Logo from "@components/icons/Logo"
import HomeEth from "@components/icons/HomeEth"
import {
  Container,
  Examples,
  FAQs,
  HomeBanner,
  HomeHero,
  HomeSection
} from "@components/ui"
import { section1, section2, section3 } from "@lib/content/home"
import { NextSeo } from "next-seo"
import {
  defaultDescription,
  defaultTitle,
  longTitle,
  domain
} from "@components/common/Head"
import { inView, animate } from "motion"
import { useEffect } from "react"

const Home = () => {
  useEffect(() => {
    inView(".spin-el", ({ target }) => {
      const controls = animate(
        target,
        { transform: "rotate(360deg)" },
        {
          easing: "linear",
          duration: 30,
          repeat: Infinity,
          allowWebkitAcceleration: true
        }
      )

      // return () => controls.stop()
    })

    // inView("#spin-logo", () => {
    //   const controls = animate(
    //     ".spin-el1",
    //     { transform: "rotate(360deg)" },
    //     {
    //       easing: "linear",
    //       duration: 30,
    //       repeat: Infinity,
    //       allowWebkitAcceleration: true
    //     }
    //   )

    // return () => controls.stop()
    // })
  }, [])

  return (
    <>
      <NextSeo
        openGraph={{
          title: longTitle,
          description: defaultDescription,
          url: domain,
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
      <HomeHero />
      <Container page={true}>
        <main className="max-w-screen-lg pb-10 mx-auto text-center">
          <div className="space-y-28 sm:space-y-52">
            <HomeSection text={section1} image={<HomeCake />} />
            <HomeSection
              text={section2}
              image={
                <Logo interactive size="w-32 sm:w-36" margin="mt-4 ml-6" spin />
              }
              side="right"
            />
            <HomeSection
              text={section3}
              image={<HomeEth size="w-32 sm:w-36" />}
            />
            {/* <HomeSection
              text={section4}
              image={<HomeEth size="w-32 sm:w-36" />}
              side="right"
            /> */}
          </div>
        </main>
        <Examples />
      </Container>
      <HomeBanner />
      <Container page={true}>
        <FAQs />
      </Container>
    </>
  )
}

export default Home

/** TODO
 *
 * *Critical priority*
 *
 * *High Priority*
 *
 * *Low Priority*
 *    - Receive ERC721-1155
 *      - NFT section
 *    - Products
 *      - product likes
 *      - sort products by productId / createdAt / totalPurchases / likes
 *      - edit/delete products
 *    - sponsorships
 *      - improve what sponsors can do
 *      - allow creator to hide links
 *
 *    - add "explore products" page
 *    - add detailed section in slicer page (stats & stuff for payees only)
 *    - transfer page (select box to choose slicer)
 *    - optimize subgraph queries (products + payeeslicer) in slicer/[id], if possible
 *
 * OTHER
 * - Handle ERC20
 * - DeGov logics
 * - create vaults and allow spending money directly from slicer
 */
