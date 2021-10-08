import HomeCake from "@components/icons/HomeCake"
import Logo from "@components/icons/Logo"
import HomeEth from "@components/icons/HomeEth"
import {
  Container,
  Examples,
  FAQs,
  HomeHero,
  HomeSection,
  SubscribeForm,
} from "@components/ui"
import { useEffect } from "react"
import { section1, section2, section3, section4 } from "@lib/text/home"
import HomeDecentralized from "@components/icons/HomeDecentralized"
import { NextSeo } from "next-seo"
import {
  defaultDescription,
  defaultTitle,
  longTitle,
  domain,
} from "@components/common/Head"
import { animate } from "motion"

const Home = () => {
  useEffect(() => {
    const spinElements = document.querySelectorAll(".spin-el")

    animate(
      spinElements,
      { transform: "rotate(360deg)" },
      {
        easing: "linear",
        duration: 30,
        repeat: Infinity,
        allowWebkitAcceleration: true,
      }
    )
  }, [])

  return (
    <>
      <NextSeo
        title="The decentralized slicing platform"
        openGraph={{
          title: longTitle,
          description: defaultDescription,
          url: `https://${domain}`,
          images: [
            {
              url: `https://${domain}/og_image.jpg`,
              width: 1000,
              height: 1000,
              alt: `${defaultTitle} cover image`,
            },
          ],
        }}
      />
      <Container page={true}>
        <main className="max-w-screen-lg pb-10 mx-auto text-center">
          <HomeHero />
          <div className="space-y-28 sm:space-y-44">
            <HomeSection text={section1} image={<HomeCake />} />
            <HomeSection
              text={section2}
              image={
                <Logo interactive size="w-32 sm:w-36" margin="mt-4 ml-6" spin />
              }
              side="right"
            />
            <HomeSection text={section3} image={<HomeDecentralized />} />
            <HomeSection
              text={section4}
              image={<HomeEth size="w-32 sm:w-36" />}
              side="right"
            />
          </div>
        </main>
        <Examples />
      </Container>
      <SubscribeForm />
      <Container page={true}>
        <FAQs />
      </Container>
    </>
  )
}

export default Home

/** TODO
 *
 * - prepare launch with content for twitter, discord, emails
 *
 * *Pre-launch*
 *    - wait for low gas price
 *
 *  ENS
 *    - buy ens domain on mainnet -> slice-so.eth
 *    - Change "slice.eth" placeholders on website (+ stuff related to rinkeby)
 *
 *  CONTRACTS
 *    - deploy on mainnet
 *
 *  SUBGRAPH
 *    - Buy Graph tokens
 *    - deloy subgraph with mainnet contracts
 *    - publish subgraph on mainnet
 *
 *    - change new env on vercel + change ext. services from rinkeby
 *    - see stuff in context to change (rpc chain somewhere)
 *
 * *Low Priority*
 *    - Receive ERC721-1155
 *      - NFT section
 *    - Products
 *      - product likes
 *      - sort products by productId / createdAt / totalPurchases / likes
 *      - edit/delete products
 *    - sponsorships
 *      - allow creator to hide links
 *
 *    - (prisma) add {isVisible} boolean field in Slicer model to toggle visibility in Explore page
 *    - add slicer tags in metadata & slicer page
 *    - add products "explore" page
 *    - add detailed section in slicer page (stats & stuff for payees only)
 *    - transfer page (select box to choose slicer)
 *    - optimize subgraph queries (products + payeeslicer) in slicer/[id], if possible
 *
 *
 *
 * OTHER
 * - Handle ERC20
 * - DeGov logics
 */
