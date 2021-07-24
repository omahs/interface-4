import React, { InputHTMLAttributes } from "react"

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  label?: string
  prefix?: string
  after?: string
  error?: boolean
  onChange?: (...args: any[]) => any
}

const Input: React.FC<Props> = (props) => {
  const {
    className,
    onChange,
    label,
    prefix = "",
    after,
    children,
    error = false,
    ...rest
  } = props

  const rootClassName = ` bg-white py-2 pl-5 w-full appearance-none transition duration-150 ${
    !prefix && !error ? "shadow-light-focusable" : ""
  } ease-in-out pr-3 border-b-[3px] placeholder-gray-400 focus:outline-none disabled:text-gray-500 disabled:border-blue-100 disabled:bg-gray-50 ${className} ${
    error
      ? "text-red-500 border-red-400 focus:border-red-400 shadow-error"
      : "text-black border-blue-300 focus:border-sky-600"
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
        <p className="pb-1.5 text-sm font-semibold text-left text-gray-700">
          {label}
        </p>
      )}
      <div
        className={`flex text-red-500 rounded-t-sm ${
          prefix && !error ? "shadow-light-focusable overflow-hidden" : ""
        }`}
      >
        {prefix && (
          <div className="flex items-center text-sm justify-center px-5 text-gray-600 bg-gray-200 dark:bg-gray-700 border-b-[3px] border-blue-300">
            {prefix}
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
      </div>
    </label>
  )
}

export default Input
