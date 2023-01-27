import Link from "next/link"
import { Button, DoubleText } from "@components/ui"
import saEvent from "@utils/saEvent"

const HomeHero = () => {
  return (
    <div className="max-w-lg mx-auto relative min-h-[440px] sm:min-h-[520px] flex flex-col justify-center pb-16 sm:pb-24">
      <div className="pb-2">
        <DoubleText
          inactive
          logoText="Slice"
          size="text-5xl sm:text-6xl"
          position="mr-4"
        />
      </div>
      <h2 className="py-3 text-xl font-black leading-normal sm:py-6 sm:text-2xl">
        The decentralized infrastructure for commerce and payments
      </h2>
      <p className="pt-3 text-lg">
        Buy and sell anything fully on-chain, and split payments between
        multiple addresses
      </p>

      <div className="flex flex-col items-center justify-center pt-10 space-y-8">
        <Button label="Create slicer" href="/slice" />
        {process.env.NEXT_PUBLIC_CHAIN_ID === "1" && (
          <div onClick={() => saEvent("homepage_secondary_button_click")}>
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
