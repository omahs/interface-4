import { Button, DoubleText } from "@components/ui"
// import ReactRotatingText from "react-rotating-text"

const items = [
  "applications 👩‍💻",
  "NFTs ?",
  "services ✨",
  "your store 👩‍🍳",
  "your artworks 👨‍🎨",
  "the real world 🌍",
]

const HomeHero = () => {
  return (
    <div className="relative min-h-[440px] sm:min-h-[520px] flex flex-col justify-center pb-16 sm:pb-24">
      <div className="pb-6 sm:pb-6">
        <DoubleText
          inactive
          logoText={`Slice`}
          size="text-6xl sm:text-7xl"
          position="mr-4"
        />
      </div>
      <h2 className="py-2 xs:py-4 text-[1.38rem] font-black leading-normal xs:text-2xl sm:!text-3xl">
        NFTs that earn you ETH
        {/* NFTs with real value */}
        {/* Decentralized product stores
        <br />& payments infrastructure */}
        {/* <br />
        <span className="text-random2-600">
          for{" "}
          <ReactRotatingText
            pause={2000}
            emptyPause={750}
            typingInterval={75}
            items={items}
          /> 
        </span>*/}
      </h2>

      <div className="flex flex-col items-center justify-center space-y-6 pt-7 ">
        <Button label="Start slicing" href="/slice" />
        {/* <Link href="/slicer">
          <a>See Slicers</a>
        </Link> */}
      </div>
      {/* <div className="absolute top-0 right-0">
        <Image src={isthis} alt="" />
      </div> */}
    </div>
  )
}

export default HomeHero
