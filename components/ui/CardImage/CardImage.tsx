import Link from "next/link"
import { CardImageElement, SlicerImage } from "@components/ui"

export type CardInfo = {
  content: JSX.Element | string
  title?: string
  className?: string
  padding?: string
}

type Props = {
  name: string
  imageUrl: string
  href?: string
  topLeft?: CardInfo
  topRight?: CardInfo
  bottomLeft?: CardInfo
  bottomRight?: CardInfo
  className?: string
  size?: string
  product?: boolean
}

const CardImage = ({
  name,
  imageUrl,
  href,
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
  className = "shadow-md rounded-xl",
  size = "sm:w-80 h-60 sm:h-52",
  product,
}: Props) => {
  return (
    <div
      className={`relative w-full overflow-hidden ${className} nightwind-prevent-block img-background ${size}`}
    >
      {href ? (
        <Link href={href}>
          <a>
            <SlicerImage name={name} imageUrl={imageUrl} product={product} />
          </a>
        </Link>
      ) : (
        <SlicerImage name={name} imageUrl={imageUrl} product={product} />
      )}
      {topLeft && (
        <CardImageElement
          title={topLeft.title}
          className={`top-0 left-0 rounded-br-xl ${topLeft.className} ${
            topLeft.padding ? topLeft.padding : "px-6"
          }`}
          content={topLeft.content}
        />
      )}
      {topRight && (
        <CardImageElement
          title={topRight.title}
          className={`top-0 right-0 rounded-bl-xl ${topRight.className} ${
            topRight.padding ? topRight.padding : "px-6"
          }`}
          content={topRight.content}
        />
      )}
      {bottomLeft && (
        <CardImageElement
          title={bottomLeft.title}
          className={`bottom-0 left-0 px-6 rounded-tr-xl ${
            bottomLeft.className
          } ${bottomLeft.padding ? bottomLeft.padding : "px-6"}`}
          content={bottomLeft.content}
        />
      )}
      {bottomRight && (
        <CardImageElement
          title={bottomRight.title}
          className={`bottom-0 right-0 rounded-tl-xl ${bottomRight.className} ${
            bottomRight.padding ? bottomRight.padding : "px-6"
          }`}
          content={bottomRight.content}
        />
      )}
    </div>
  )
}

export default CardImage
