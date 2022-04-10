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
import { useEffect } from "react"
import { section1, section2, section3, section4 } from "@lib/content/home"
import HomeDecentralized from "@components/icons/HomeDecentralized"
import { NextSeo } from "next-seo"
import {
  defaultDescription,
  defaultTitle,
  longTitle,
  domain
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
        allowWebkitAcceleration: true
      }
    )
  }, [])

  return (
    <>
      <NextSeo
        title="The decentralized slicing protocol"
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
      <HomeBanner />
      <Container page={true}>
        <FAQs />
      </Container>
    </>
  )
}

export default Home
