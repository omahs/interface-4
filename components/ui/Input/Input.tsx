import Arrow from "@components/icons/Arrow"
import React, { InputHTMLAttributes } from "react"

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  label?: string
  prefix?: string
  after?: string
  error?: boolean
  inverted?: boolean
  onClickLabel?: string
  prefixAction?: (...args: any[]) => any
  onClick?: (...args: any[]) => any
  onChange?: (...args: any[]) => any
}

const Input: React.FC<Props> = (props) => {
  const {
    className,
    label,
    prefix = "",
    after,
    children,
    error,
    inverted,
    prefixAction,
    onClick,
    onClickLabel,
    onChange,
    ...rest
  } = props

  const rootClassName = `peer py-2 pl-5 w-full appearance-none transition-all duration-150 rounded-t-sm ${
    !prefix && !error ? "shadow-light-focusable" : ""
  } ease-in-out pr-3 border-b-[3px] focus:outline-none ${className} ${
    error
      ? "text-red-500 border-red-400 bg-white focus:border-red-400 shadow-error"
      : inverted
      ? "bg-black text-white border-blue-600 focus:border-sky-300 placeholder-gray-500 disabled:text-gray-400 disabled:border-blue-800 disabled:bg-gray-900"
      : "bg-white text-black border-blue-300 focus:border-sky-600 placeholder-gray-400 disabled:text-gray-500 disabled:border-blue-100 disabled:bg-gray-50"
  }`

  const handleOnChange = (e: any) => {
    if (onChange) {
      onChange(e.target.value)
    }
    return null
  }

  return (
    <label>
      {label && (
        <p
          className={`pb-1.5 text-sm font-semibold text-left ${
            inverted ? "text-gray-200" : "text-gray-700"
          }`}
        >
          {label}
        </p>
      )}
      <div
        className={`flex flex-row-reverse mb-3 rounded-t-sm ${
          prefix && !error ? "shadow-light-focusable overflow-hidden" : ""
        }`}
      >
        {onClickLabel && onClick && (
          <div
            className={`cursor-pointer text-sm font-medium group flex items-center justify-center px-5 bg-blue-600 transition-colors duration-150 dark:bg-blue-600 hover:bg-blue-700 text-white nightwind-prevent ${
              error ? "shadow-error" : ""
            }`}
            onClick={onClick}
          >
            <span className="">{onClickLabel}</span>{" "}
            <div className="w-[1.2rem] h-[1.2rem] ml-1 text-white nightwind-prevent transition-transform duration-150 group-hover:translate-x-1">
              <Arrow />
            </div>
          </div>
        )}
        <input
          className={rootClassName}
          onChange={handleOnChange}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          {...rest}
        ></input>
        {prefix && (
          <div
            className={`flex transition duration-150 items-center justify-center px-5 text-gray-600 bg-gray-200 dark:bg-gray-700 border-b-[3px] ${
              error
                ? "border-red-400 peer-focus:border-red-400 dark:peer-focus:border-red-500 shadow-error"
                : "text-black border-blue-300 peer-focus:border-sky-600 dark:peer-focus:border-sky-300"
            } ${
              prefixAction
                ? "cursor-pointer hover:bg-gray-100 hover:text-blue-600"
                : ""
            }`}
            onClick={prefixAction ? () => prefixAction() : null}
          >
            {prefix}
          </div>
        )}
      </div>
    </label>
  )
}

export default Input
