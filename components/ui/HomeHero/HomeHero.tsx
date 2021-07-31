import Link from "next/link"
import { Button, DoubleText } from "@components/ui"
import ReactRotatingText from "react-rotating-text"
import Arrow from "@components/icons/Arrow"

const items = [
  "applications 👩‍💻",
  "services ✨",
  "everything 🐶",
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
        <DoubleText
          inactive
          logoText={`beta`}
          size="text-xl sm:text-2xl"
          position=""
        />
      </div>
      <h2 className="pb-1 font-black leading-normal">
        Decentralized payments <br />
        <span className="text-blue-600">
          for{" "}
          <ReactRotatingText
            pause={2000}
            emptyPause={750}
            typingInterval={75}
            items={items}
          />
        </span>
      </h2>

      <div className="flex flex-col items-center justify-center pt-8 space-y-6 ">
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
