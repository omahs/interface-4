import Link from "next/link"
import Image from "next/image"
import isthis from "public/isthis.jpeg"
import { Button, DoubleText } from "@components/ui"
import { useEffect, useState } from "react"

const textCarousel = ["applications", "services", "everything"]

const HomeHero = () => {
  const [text, setText] = useState("")

  useEffect(() => {
    setTimeout(() => {
      setText(textCarousel[0])
    }, 2000)
    setTimeout(() => {
      setText(textCarousel[1])
    }, 4000)
    setTimeout(() => {
      setText(textCarousel[2])
    }, 6000)
  }, [])

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
        <span className="text-blue-600">for {text}</span>
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
