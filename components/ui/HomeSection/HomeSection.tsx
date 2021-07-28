import Logo from "@components/icons/Logo"
import Image from "next/image"
import defaultImageUrl from "public/slicer_default.png"

type Props = {
  text: JSX.Element
  image?: StaticImageData
  side?: "left" | "right"
}

const HomeSection = ({ text, image, side = "left" }: Props) => {
  return (
    <div className={`flex ${side === "right" ? "flex-row-reverse" : ""}`}>
      <div
        className={`prose flex-1 ${
          side === "left" ? "text-left" : "text-right"
        }`}
      >
        {text}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-center w-full h-full">
          <Logo size="w-36" margin="mt-4 ml-6" spin />
        </div>
        {/* <Image src={image || defaultImageUrl} alt="" /> */}
      </div>
    </div>
  )
}

export default HomeSection
