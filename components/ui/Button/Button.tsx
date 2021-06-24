import { FC } from "react"
import Spinner from "@components/icons/Spinner"
import Link from "next/link"

interface ButtonProps {
  loading?: boolean
  className?: string
  color?: string
  type?: "button" | "submit" | "reset"
  label?: string
  href?: string
  onClick?: any
}

const Button: FC<ButtonProps> = (props) => {
  const {
    className = "rounded-sm",
    color = "text-white font-medium bg-blue-500 hover:bg-blue-600 focus:bg-blue-600",
    type,
    label,
    href,
    onClick,
    loading = false,
    ...rest
  } = props

  const rootClassName = `px-7 h-[38px] min-w-[150px] rounded-sm overflow-hidden focus:outline-none ${color} ${className}`

  return href ? (
    <Link href={href} passHref>
      <button className={rootClassName}>{label}</button>
    </Link>
  ) : (
    <button className={rootClassName} type={type} onClick={onClick}>
      {loading ? (
        <div className="flex w-full justify-center items-center">
          <Spinner />
        </div>
      ) : (
        label
      )}
    </button>
  )
}

export default Button
