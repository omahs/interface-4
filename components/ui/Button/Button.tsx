import { FC } from "react"
import Spinner from "@components/icons/Spinner"
import Link from "next/link"
import { useAppContext } from "@components/ui/context"
import saEvent from "@utils/saEvent"

interface ButtonProps {
  loading?: boolean
  double?: boolean
  wrapperClassName?: string
  className?: string
  color?: string
  type?: "button" | "submit" | "reset"
  label?: string | JSX.Element
  loadingLabel?: string
  href?: string
  external?: boolean
  targetBlank?: boolean
  disabled?: boolean
  onClick?: any
  saEventName?: string
}

const Button: FC<ButtonProps> = (props) => {
  const {
    wrapperClassName = "",
    className = "h-[38px] font-bold tracking-wide rounded-md overflow-hidden nightwind-prevent px-5 min-w-[150px] focus:outline-none",
    color = "text-white bg-blue-600 hover:bg-blue-700 focus:bg-blue-700",
    type = "button",
    label,
    loadingLabel,
    href,
    onClick,
    loading = false,
    double = true,
    external = false,
    targetBlank = true,
    disabled = false,
    saEventName = "",
    ...rest
  } = props

  const { color1, color2 } = useAppContext()

  return (
    <div
      className={`relative inline-block ${wrapperClassName}`}
      onClick={() => (saEventName ? saEvent(saEventName) : null)}
    >
      {href ? (
        !external ? (
          <Link href={href} passHref>
            <button className={`peer relative z-10 ${className} ${color}`}>
              <div className="flex items-center justify-center">
                <p>{label}</p>
              </div>
            </button>
          </Link>
        ) : targetBlank ? (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="relative z-10 peer"
          >
            <button className={`${className} ${color}`}>
              <div className="flex items-center justify-center">
                <p>{label}</p>
              </div>
            </button>
          </a>
        ) : (
          <a href={href} className="relative z-10 peer">
            <button className={`${className} ${color}`}>
              <div className="flex items-center justify-center">
                <p>{label}</p>
              </div>
            </button>
          </a>
        )
      ) : (
        <button
          className={`peer relative z-10 ${className} ${
            disabled ? "text-white bg-gray-600 cursor-not-allowed" : color
          }`}
          type={type}
          onClick={!disabled && !loading ? onClick : null}
          disabled={disabled}
        >
          {loading ? (
            <div className="flex items-center justify-center w-full">
              {loadingLabel && <p className="mr-3">{loadingLabel}</p>}
              <Spinner color="text-white nightwind-prevent" />
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <div>{label}</div>
            </div>
          )}
        </button>
      )}
      {double && (
        <div
          className={`${className} w-full shadow-light-random animate-pulse-slow opacity-80 absolute top-0 translate-x-[0.6rem] translate-y-[0.6rem] bg-gradient-to-br ${
            color1[3]
          } ${color2[4]} text-transparent ${
            !disabled
              ? "peer-hover:translate-x-0 peer-hover:translate-y-0 peer-focus:translate-x-0 peer-focus:translate-y-0 transition-all duration-150"
              : ""
          }`}
        />
      )}
    </div>
  )
}

export default Button
