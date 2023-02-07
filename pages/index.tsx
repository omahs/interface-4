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

// TODO: Fix hydration errors on most pages + cart component + probably modal
// TODO: Update homepage texts
