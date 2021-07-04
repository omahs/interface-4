import { FC } from "react"
import Link from "next/link"
import s from "./DoubleText.module.css"

interface Props {
  logoText?: string
  size?: string
  position?: string
  fromColor?: string
  toColor?: string
  inactive?: boolean
}

const Logo: FC<Props> = ({
  size,
  position,
  inactive,
  logoText,
  fromColor,
  toColor,
}) => {
  const text = logoText || "Slice"
  const fromLogoColors = [
    "from-cyan-300",
    "from-green-300",
    "from-purple-300",
    "from-indigo-300",
    "from-yellow-300",
    "from-red-300",
    "from-pink-300",
    "from-blue-300",
    "from-sky-300",
  ]
  const toLogoColors = [
    "to-cyan-300",
    "to-green-300",
    "to-purple-300",
    "to-indigo-300",
    "to-yellow-300",
    "to-red-300",
    "to-pink-300",
    "to-blue-300",
    "to-sky-300",
  ]
  const logoColor =
    fromColor ||
    fromLogoColors[Math.floor(Math.random() * fromLogoColors.length)]
  const logoColor2 =
    toColor || toLogoColors[Math.floor(Math.random() * toLogoColors.length)]

  return (
    <div
      className={`${inactive ? "" : "group "}${
        position ? position : "absolute top-0 left-0"
      }`}
    >
      {inactive ? (
        <div
          className={`text-black relative z-10 font-extrabold cursor-default ${
            size ? size : "text-2xl md:text-3xl"
          }`}
        >
          {text}
        </div>
      ) : (
        <Link href="/">
          <a
            className={`text-black relative z-10 font-extrabold ${
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
        } text-transparent font-extrabold bg-gradient-to-br bg-clip-text ${logoColor} ${logoColor2} mt-[0.1em] ml-[0.1em] group-hover:mt-0 group-hover:ml-0 duration-150`}
        style={{ marginTop: "0.1em", marginBottom: 0 }}
      >
        {text}
      </p>
    </div>
  )
}

export default Logo
