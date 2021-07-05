import { FC } from "react"
import Link from "next/link"
import { useAppContext } from "@components/ui/context"

interface Props {
  logoText?: string
  size?: string
  position?: string
  fromColor?: string
  toColor?: string
  inactive?: boolean
}

const Logo: FC<Props> = ({ size, position, inactive, logoText }) => {
  const { color1, color2 } = useAppContext()
  const text = logoText || "Slice"

  return (
    <div
      className={`relative pb-8 ${inactive ? "" : "group "}${
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
        } text-transparent font-extrabold bg-gradient-to-br bg-clip-text ${
          color1[3]
        } ${
          color2[4]
        } mt-[0.1em] ml-[0.1em] group-hover:mt-0 group-hover:ml-0 duration-150`}
        style={{ marginTop: "0.1em", marginBottom: 0 }}
      >
        {text}
      </p>
    </div>
  )
}

export default Logo
