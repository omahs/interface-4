import { useAppContext } from "../context"

type Props = {
  text: JSX.Element
  image: JSX.Element
  side?: "left" | "right"
}

const HomeSection = ({ text, image, side = "left" }: Props) => {
  const { shuffleColors } = useAppContext()
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
          <div className="cursor-pointer" onClick={() => shuffleColors()}>
            {image}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeSection
