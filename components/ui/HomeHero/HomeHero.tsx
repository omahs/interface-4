import Link from "next/link"
import { Button, DoubleText } from "@components/ui"
import { domain } from "@components/common/Head"
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
    <div className="relative min-h-[440px] sm:min-h-[520px] flex flex-col justify-center pb-20 sm:pb-28">
      <div className="pb-6 sm:pb-6">
        <DoubleText
          inactive
          logoText="Slice"
          size="text-6xl sm:text-7xl"
          position="mr-4"
        />
      </div>
      <h2 className="py-2 sm:py-4 text-[1.38rem] font-black leading-normal xs:text-2xl sm:!text-3xl">
        The Decentralized Commerce Protocol
      </h2>
      <h2 className="text-xl font-normal leading-normal sm:!text-xl">
        Web3 payments, NFT royalties, on-chain storefronts
      </h2>

      <div className="flex flex-col items-center justify-center pt-10 space-y-8 ">
        <Button label="Start slicing" href="/slice" />
        {process.env.NEXT_PUBLIC_CHAIN_ID === "1" && (
          <Link href="/slicer/1">
            <a className="highlight">or check out the Slice Genesis slicer</a>
          </Link>
        )}
      </div>
      {/* <div className="absolute top-0 right-0">
        <Image src={heroImage} alt="" />
      </div> */}
    </div>
  )
}

export default HomeHero
