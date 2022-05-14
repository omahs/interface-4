import Link from "next/link"
import { CardImageElement, SlicerImage } from "@components/ui"

export type CardInfo = {
  content: JSX.Element | string
  title?: string
  className?: string
  padding?: string
  clickable?: boolean
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
  disableHover?: boolean
  product?: boolean
  onClick?: (...args: any[]) => any
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
  disableHover,
  product,
  onClick
}: Props) => {
  return (
    <div
      className={`relative group w-full flex-shrink-0 overflow-hidden ${className} nightwind-prevent-block img-background ${size}`}
    >
      {href ? (
        <Link href={href}>
          <a>
            <SlicerImage
              name={name}
              imageUrl={imageUrl}
              product={product}
              disableHover={disableHover}
            />
          </a>
        </Link>
      ) : (
        <SlicerImage
          name={name}
          imageUrl={imageUrl}
          product={product}
          disableHover={disableHover}
        />
      )}
      {topLeft && (
        <CardImageElement
          title={topLeft.title}
          className={`top-0 left-0 rounded-br-xl ${topLeft.className} ${
            topLeft.padding ? topLeft.padding : "px-6"
          }`}
          content={topLeft.content}
          href={href}
          onClick={onClick}
          clickable={topLeft.clickable}
        />
      )}
      {topRight && (
        <CardImageElement
          title={topRight.title}
          className={`top-0 right-0 rounded-bl-xl ${topRight.className} ${
            topRight.padding ? topRight.padding : "px-6"
          }`}
          content={topRight.content}
          href={href}
          onClick={onClick}
          clickable={topRight.clickable}
        />
      )}
      {bottomLeft && (
        <CardImageElement
          title={bottomLeft.title}
          className={`bottom-0 left-0 px-6 rounded-tr-xl ${
            bottomLeft.className
          } ${bottomLeft.padding ? bottomLeft.padding : "px-6"}`}
          content={bottomLeft.content}
          href={href}
          onClick={onClick}
          clickable={bottomLeft.clickable}
        />
      )}
      {bottomRight && (
        <CardImageElement
          title={bottomRight.title}
          className={`bottom-0 right-0 rounded-tl-xl ${bottomRight.className} ${
            bottomRight.padding ? bottomRight.padding : "px-6"
          }`}
          content={bottomRight.content}
          href={href}
          onClick={onClick}
          clickable={bottomRight.clickable}
        />
      )}
      {onClick && <div className="absolute w-full h-full" onClick={onClick} />}
    </div>
  )
}

export default CardImage
