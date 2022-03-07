import Link from "next/link"
import { Button, DoubleText } from "@components/ui"
// import ReactRotatingText from "react-rotating-text"

// const items = [
//   "applications 👩‍💻",
//   "NFTs ?",
//   "services ✨",
//   "your store 👩‍🍳",
//   "your artworks 👨‍🎨",
//   "the real world 🌍",
// ]

const HomeHero = () => {
  return (
    <div className="relative min-h-[440px] sm:min-h-[520px] flex flex-col justify-center pb-16 sm:pb-24">
      <div className="pb-6 sm:pb-6">
        <DoubleText
          inactive
          logoText="Slice"
          size="text-6xl sm:text-7xl"
          position="mr-4"
        />
        <DoubleText
          inactive
          logoText="beta"
          size="text-3xl sm:text-4xl"
          position="pl-1 mr-4"
        />
      </div>
      <h2 className="py-2 sm:py-4 text-[1.38rem] font-black leading-normal xs:text-2xl sm:!text-3xl">
        Decentralized stores & payments
      </h2>
      <h2 className="text-xl font-medium leading-normal sm:!text-xl">
        with fractionalized NFT royalties
      </h2>

      <div className="flex flex-col items-center justify-center space-y-8 pt-7 ">
        <Button label="Start slicing" href="/slice" />
        {/* <Link href="/slicer/1">
          <a className="highlight">Check out the first community slicer</a>
        </Link> */}
      </div>
      {/* <div className="absolute top-0 right-0">
        <Image src={heroImage} alt="" />
      </div> */}
    </div>
  )
}

export default HomeHero
