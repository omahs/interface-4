import { FC } from "react"
import Spinner from "@components/icons/Spinner"
import Link from "next/link"
import { useAppContext } from "@components/ui/context"
import Logo from "@components/icons/Logo"

interface ButtonProps {
  loading?: boolean
  requireConnection?: boolean
  double?: boolean
  className?: string
  color?: string
  type?: "button" | "submit" | "reset"
  label?: string
  href?: string
  onClick?: any
}

const Button: FC<ButtonProps> = (props) => {
  const {
    className = "h-[40px] font-medium rounded-sm border-white border-[3px] nightwind-prevent shadow-button",
    color = "text-white bg-blue-500 hover:bg-blue-600 focus:bg-blue-600",
    type,
    label,
    href,
    onClick,
    loading = false,
    requireConnection = false,
    double = true,
    ...rest
  } = props

  const { color1, color2, isConnected } = useAppContext()
  const innerText =
    requireConnection && !isConnected ? (
      <>
        <p>{label}</p>
        <div className="mb-1 ml-3">
          <Logo size="w-[17px]" margin="mt-[3px] ml-[5px]" />
        </div>
      </>
    ) : (
      <p>{label}</p>
    )

  const requestAccount = async () => {
    await window.ethereum.request({ method: "eth_requestAccounts" })
  }

  const rootClassName = `px-7 min-w-[150px] rounded-sm overflow-hidden focus:outline-none ${className}`

  return (
    <div className="relative inline-block group">
      {href ? (
        <Link href={href} passHref>
          <button className={`${rootClassName} ${color}`}>
            <div className="flex items-center justify-center">{innerText}</div>
          </button>
        </Link>
      ) : (
        <button
          className={`${rootClassName} ${color}`}
          type={type}
          onClick={requireConnection && !isConnected ? requestAccount : onClick}
        >
          {loading ? (
            <div className="flex items-center justify-center w-full">
              <Spinner />
            </div>
          ) : (
            <div className="flex items-center justify-center">{innerText}</div>
          )}
        </button>
      )}
      {double && (
        <div
          className={`${rootClassName} absolute top-0 mt-[0.6rem] ml-[0.6rem] mr-[-0.6rem] bg-gradient-to-br ${color1[3]} ${color2[4]} text-transparent -z-10 group-hover:mt-0 group-hover:ml-0 group-hover:mr-0 transition-all duration-150`}
        >
          <div className="flex items-center justify-center">{innerText}</div>
        </div>
      )}
    </div>
  )
}

export default Button
