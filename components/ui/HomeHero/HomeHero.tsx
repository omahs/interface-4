import Link from "next/link"
import Image from "next/image"
import isthis from "public/isthis.jpeg"
import { Button, DoubleText } from "@components/ui"
import ReactRotatingText from "react-rotating-text"

const HomeHero = () => {
  return (
    <div className="relative min-h-[440px] sm:min-h-[520px] flex flex-col justify-center pb-16 sm:pb-24">
      <div className="pb-6 sm:pb-6">
        <DoubleText
          inactive
          logoText={`Slice`}
          size="text-6xl sm:text-7xl"
          position=""
        />
        <DoubleText
          inactive
          logoText={`beta`}
          size="text-xl sm:text-2xl"
          position="pl-4"
        />
      </div>
      <h2 className="pb-1 font-black leading-normal">
        Decentralised payments <br />
        <span className="text-blue-600">
          for{" "}
          <ReactRotatingText
            pause={2000}
            items={["applications", "services", "everything"]}
          />
        </span>
      </h2>

      <div className="flex flex-row items-center justify-start pt-8 space-x-12 space-y-0 sm:pt-10 sm:py-10">
        <Button label="Start slicing" href="/slice" />
        <Link href="/slicer">
          <a>See Slicers</a>
        </Link>
      </div>
      {/* <div className="absolute top-0 right-0">
        <Image src={isthis} alt="" />
      </div> */}
    </div>
  )
}

export default HomeHero
