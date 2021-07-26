type Props = {
  text: JSX.Element
  side?: "left" | "right"
}

const HomeSection = ({ text, side = "left" }: Props) => {
  return (
    <div className={`flex ${side === "right" ? "flex-row-reverse" : ""}`}>
      <div className={`prose ${side === "left" ? "text-left" : "text-right"}`}>
        {text}
      </div>
      <div></div>
    </div>
  )
}

export default HomeSection
