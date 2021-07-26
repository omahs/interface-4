import { FC } from "react"
import Link from "next/link"
import { useAppContext } from "@components/ui/context"

interface Props {
  logoText?: string
  size?: string
  position?: string
  inactive?: boolean
  inverted?: boolean
  fromColor?: string
  toColor?: string
}

const DoubleText: FC<Props> = ({
  logoText,
  size,
  position,
  inactive,
  inverted,
}) => {
  const { color1, color2, darkColor1, darkColor2 } = useAppContext()
  const text = logoText || "Slice"

  return (
    <div
      className={`inline-block relative ${inactive ? "" : "group "}${
        position ? position : "absolute top-0 left-0"
      }`}
    >
      {inactive ? (
        <div
          className={`${
            inverted ? "text-white" : "text-black"
          } relative z-10 !font-black cursor-default ${
            size ? size : "text-2xl md:text-3xl"
          }`}
        >
          {text}
        </div>
      ) : (
        <Link href="/">
          <a
            className={`${
              inverted ? "text-white" : "text-black"
            } relative z-10 !font-black ${
              size ? size : "text-2xl md:text-3xl"
            }`}
          >
            {text}
          </a>
        </Link>
      )}
      <p
        className={`absolute top-0 w-full select-none
        ${inactive ? "cursor-default" : ""}
        ${
          size ? size : "text-2xl md:text-3xl"
        } text-transparent !font-black bg-gradient-to-br bg-clip-text ${
          inverted ? darkColor1[3] : color1[3]
        } ${
          inverted ? darkColor2[4] : color2[4]
        } mt-[0.1em] ml-[0.1em] group-hover:mt-0 group-hover:ml-0 duration-150`}
        style={{ marginTop: "0.1em", marginBottom: 0 }}
      >
        {text}
      </p>
    </div>
  )
}

export default DoubleText
