import Link from "next/link"
import { Button, DoubleText } from "@components/ui"
import { useEffect, useState } from "react"

const HomeHero = () => {
  const [dynamicText, setDynamicText] = useState("ecentralized ")
  const [isCursorActive, setIsCursorActive] = useState(false)

  useEffect(() => {
    if (dynamicText != "-") {
      let timestamp

      switch (dynamicText.length) {
        case 13:
          timestamp = 4000
          break
        case 12:
        case 0:
          timestamp = 500
          break
        default:
          timestamp = 50
      }

      setTimeout(() => {
        if (dynamicText.length != 0) {
          setDynamicText(dynamicText.substring(0, dynamicText.length - 1))
        } else {
          setDynamicText("-")
          setTimeout(() => {
            setIsCursorActive(false)
          }, 500)
        }
      }, timestamp)
    }
  }, [dynamicText])

  useEffect(() => {
    setTimeout(() => {
      setIsCursorActive(true)
    }, 2000)
  }, [])

  return (
    <div className="relative min-h-[440px] sm:min-h-[520px] flex flex-col justify-center pb-16 sm:pb-24">
      <div className="pb-2">
        <DoubleText
          inactive
          logoText="Slice"
          size="text-6xl sm:text-7xl"
          position="mr-4"
        />
      </div>
      <h2 className="py-3 sm:py-6 text-[1.38rem] font-black leading-normal xs:text-2xl sm:!text-3xl">
        The{" "}
        <DoubleText
          inactive
          logoText={
            <span className="relative">
              d{dynamicText}
              {isCursorActive && (
                <span className="absolute -ml-1 font-normal react-rotating-text-cursor text-random1-600">
                  |
                </span>
              )}
              commerce
            </span>
          }
          altLogoText={`d${dynamicText}commerce`}
        />{" "}
        protocol
      </h2>
      <p className="max-w-lg mx-auto font-normal leading-normal sm:text-lg">
        Sell anything on-chain and dynamically split payments between multiple
        addresses
      </p>

      <div className="flex flex-col items-center justify-center pt-10 space-y-8">
        <Button label="Create slicer" href="/slice" />
        {process.env.NEXT_PUBLIC_CHAIN_ID === "1" && (
          <div onClick={() => sa_event("homepage_secondary_button_click")}>
            <Link href="/slicer/1">
              <a className="highlight">or check out an existing one</a>
            </Link>
          </div>
        )}
      </div>
      {/* <div className="absolute top-0 right-0">
        <Image src={heroImage} alt="" />
      </div> */}
    </div>
  )
}

export default HomeHero
