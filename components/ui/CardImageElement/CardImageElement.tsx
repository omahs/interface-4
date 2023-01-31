import Link from "next/link"

type Props = {
  title: string
  className: string
  content: JSX.Element | string
  clickable?: boolean
  href?: string
  onClick?: (...args: any[]) => any
}

const CardImageElement = ({
  title,
  className,
  content,
  href,
  onClick,
  clickable = true
}: Props) => {
  const main = (
    <span
      title={title}
      className={`absolute z-10 flex items-center bg-white bg-opacity-75 border border-white backdrop-blur-sm shadow-md h-[38px] ${className}`}
      onClick={clickable && onClick ? onClick : null}
    >
      {content}
    </span>
  )
  return clickable && href ? (
    <Link href={href}>
      <a>{main}</a>
    </Link>
  ) : (
    main
  )
}

export default CardImageElement
