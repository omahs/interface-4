type Props = {
  title: string
  className: string
  content: JSX.Element | string
}

const CardImageElement = ({ title, className, content }: Props) => {
  return (
    <span
      title={title}
      className={`absolute flex items-center bg-white shadow-md h-[38px] ${className}`}
    >
      {content}
    </span>
  )
}

export default CardImageElement
