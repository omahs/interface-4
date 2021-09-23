import Link from "next/link"
import { CardImage } from ".."
import { CardInfo } from "../CardImage/CardImage"

type Props = {
  children: JSX.Element
  name: string
  image?: string
  href?: string
  topLeft?: CardInfo
  topRight?: CardInfo
  bottomLeft?: CardInfo
  bottomRight?: CardInfo
  className?: string
  size?: string
  product?: boolean
  onClick?: (...args: any[]) => any
}

const Card = ({
  children,
  name,
  image,
  href,
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
  className,
  size,
  product,
  onClick,
}: Props) => {
  const content = (
    <div className="overflow-hidden transition-all duration-1000 ease-out bg-white rounded-xl shadow-medium-random hover:scale-105">
      <CardImage
        name={name}
        imageUrl={image}
        topLeft={topLeft}
        topRight={topRight}
        bottomLeft={bottomLeft}
        bottomRight={bottomRight}
        className={className}
        size={size}
        product={product}
        onClick={onClick}
      />
      <div className="relative w-full px-5 py-4 text-left">
        {onClick && (
          <div className="absolute w-full h-full" onClick={onClick} />
        )}
        {children}
      </div>
    </div>
  )

  return (
    <div className="my-6 cursor-pointer">
      {href ? (
        <Link href={href}>
          <a>{content}</a>
        </Link>
      ) : (
        content
      )}
    </div>
  )
}

export default Card
