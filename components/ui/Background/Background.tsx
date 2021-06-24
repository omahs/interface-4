import { FC } from "react"
import cn from "classnames"
import s from "./Background.module.css"
// import Image from "next/image"

export interface Props {
  className?: string
}

const Background: FC<Props> = (props) => {
  const { className, children, ...rest } = props
  const rootClassName = cn(
    s.root,
    {},
    className,
    "bg-gradient-to-br from-blue-50 to-gray-100"
  )

  return (
    <div className={rootClassName}>
      {/* <div className="opacity-20">
        <Image
          src="/background.jpg"
          alt={`Sfondo ${serie.title}`}
          layout="fill"
          quality="85"
          priority
        />
      </div> */}
    </div>
  )
}

export default Background
