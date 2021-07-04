import { FC } from "react"
import Spinner from "@components/icons/Spinner"
import Link from "next/link"
import { useAppContext } from "@components/ui/context"
import Logo from "@components/icons/Logo"

interface ButtonProps {
  loading?: boolean
  requireConnection?: boolean
  className?: string
  color?: string
  type?: "button" | "submit" | "reset"
  label?: string
  href?: string
  onClick?: any
}

const Button: FC<ButtonProps> = (props) => {
  const {
    className = "h-[38px] font-medium rounded-sm",
    color = "text-white bg-blue-500 hover:bg-blue-600 focus:bg-blue-600",
    type,
    label,
    href,
    onClick,
    loading = false,
    requireConnection = false,
    ...rest
  } = props

  const { isConnected } = useAppContext()
  const requestAccount = async () => {
    await window.ethereum.request({ method: "eth_requestAccounts" })
  }

  const rootClassName = `px-7 min-w-[150px] rounded-sm overflow-hidden focus:outline-none ${color} ${className}`

  return href ? (
    <Link href={href} passHref>
      <button className={rootClassName}>{label}</button>
    </Link>
  ) : (
    <button
      className={rootClassName}
      type={type}
      onClick={requireConnection && !isConnected ? requestAccount : onClick}
    >
      {loading ? (
        <div className="flex w-full justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <p>{label}</p>
          {requireConnection && !isConnected && (
            <div className="ml-3 mb-1">
              <Logo size="w-[18px]" margin="mt-[3px] ml-[5px]" />
            </div>
          )}
        </div>
      )}
    </button>
  )
}

export default Button
