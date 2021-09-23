import { FC } from "react"
import cn from "classnames"
// import Image from "next/image"

export interface Props {
  className?: string
}

const Background: FC<Props> = (props) => {
  const { className, children, ...rest } = props
  const rootClassName = cn(
    {},
    className,
    "absolute w-full h-full -z-10 bg-gradient-to-br from-white to-sky-50"
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
