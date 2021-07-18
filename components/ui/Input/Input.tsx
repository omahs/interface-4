import s from "./Input.module.css"
import React, { InputHTMLAttributes } from "react"

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  label?: string
  onChange?: (...args: any[]) => any
}

const Input: React.FC<Props> = (props) => {
  const { className, onChange, label, children, ...rest } = props

  const rootClassName = `focus:border-sky-600 shadow-light-focusable bg-white rounded-t-sm py-2 pl-5 w-full appearance-none transition duration-150 ease-in-out pr-3 border-b-[3px] placeholder-gray-400 border-blue-300 text-black focus:outline-none ${className}`

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
      <input
        className={rootClassName}
        onChange={handleOnChange}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        {...rest}
      />
    </label>
  )
}

export default Input
