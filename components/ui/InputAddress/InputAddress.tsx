import resolveEns from "@utils/resolveEns"
import throttleFunction from "@utils/throttleFunction"
import React, { InputHTMLAttributes, useEffect, useState } from "react"
import Input from "../Input/Input"

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  address: string
  label?: string
  onChange?: (...args: any[]) => any
}

const InputAddress: React.FC<Props> = (props) => {
  const { address, required, label, onChange, ...rest } = props
  const [resolvedAddress, setResolvedAddress] = useState("")

  useEffect(() => {
    // throttleFunction(
    //   resolveEns(address, setResolvedAddress),
    //   setResolvedAddress(""),
    //   200
    // )

    const timeout = setTimeout(
      () => resolveEns(address, setResolvedAddress),
      150
    )
    return () => {
      clearTimeout(timeout)
      setResolvedAddress("")
    }
  }, [address])

  return (
    <div className={`relative`}>
      <Input
        type="string"
        value={address}
        placeholder="0x… / slice.eth"
        label={label}
        required={required}
        error={resolvedAddress === "Invalid ENS name"}
        onChange={onChange}
      />
      {resolvedAddress && (
        <p
          className={`${
            resolvedAddress === "Invalid ENS name"
              ? "text-red-500"
              : "text-blue-600 dark:text-sky-300"
          } absolute text-xs opacity-80 font-black left-0 bottom-[-12px]
          }`}
        >
          {resolvedAddress}
        </p>
      )}
    </div>
  )
}

export default InputAddress
