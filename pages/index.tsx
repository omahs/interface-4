import { Banner, Container, HomeHero, HomeSection } from "@components/ui"
import { section1, section2, section3, section4 } from "@lib/text/home"

const Home = () => {
  return (
    <>
      <Container page={true}>
        <main className="max-w-screen-lg pb-20 mx-auto text-left">
          <HomeHero />
          <div className=" space-y-36">
            <HomeSection text={section1} />
            <HomeSection text={section2} side="right" />
            <HomeSection text={section3} />
            <HomeSection text={section4} side="right" />
          </div>
        </main>
      </Container>
      <Banner />
    </>
  )
}

export default Home
