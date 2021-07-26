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
        <Image src={image || defaultImageUrl} alt="" />
      </div>
    </div>
  )
}

export default HomeSection
