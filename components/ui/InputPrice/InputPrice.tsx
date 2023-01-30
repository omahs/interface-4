import { Input } from "@components/ui"
import useEthUsd from "@utils/useEthUsd"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

type Props = {
  ethValue: number
  usdValue: number
  setEthValue: Dispatch<SetStateAction<number>>
  setUsdValue: Dispatch<SetStateAction<number>>
  loading?: boolean
  error?: boolean
  required?: boolean
  disabled?: boolean
  label?: string
  actionLabel?: string
  marginLabel?: string
  question?: JSX.Element
  action?: () => any
}

const InputPrice = ({
  ethValue,
  usdValue,
  setEthValue,
  setUsdValue,
  loading,
  error,
  required,
  disabled,
  label,
  actionLabel,
  marginLabel,
  question,
  action
}: Props) => {
  const ethUsd = useEthUsd()
  const [isEth, setIsEth] = useState(true)

  const currency = isEth ? "Ξ" : "$"
  const destinationCurrency = isEth ? "$" : "Ξ"

  const handleChange = (value) => {
    if (isEth) {
      setEthValue(value)
      setUsdValue(value * ethUsd)
    } else {
      setUsdValue(value)
      setEthValue(value / ethUsd)
    }
  }

  useEffect(() => {
    if (isEth) {
      setEthValue(Math.floor(ethValue * 10000) / 10000)
    } else {
      setUsdValue(Math.floor(usdValue * 100) / 100)
    }
  }, [isEth])

  return (
    <div className="w-full mx-auto space-y-6">
      <div className="relative">
        {action ? (
          <Input
            type="number"
            placeholder={isEth ? "0.1" : "100"}
            min={0}
            step={isEth ? 0.001 : 0.1}
            label={label}
            prefix={currency}
            helpText={
              process.env.NEXT_PUBLIC_CHAIN_ID == "5"
                ? "Note that USD / ETH on Goerli is different than on mainnet"
                : ""
            }
            prefixAction={() => setIsEth((isEth) => !isEth)}
            value={isEth ? ethValue || "" : usdValue || ""}
            onChange={handleChange}
            onClick={() => action()}
            onClickLabel={actionLabel}
            loading={loading}
            error={error}
            required={required}
            disabled={disabled}
            question={question}
          />
        ) : (
          <Input
            type="number"
            placeholder={isEth ? "0.1" : "100"}
            min={0}
            step={isEth ? 0.001 : 0.1}
            label={label}
            prefix={currency}
            helpText={
              process.env.NEXT_PUBLIC_CHAIN_ID == "5"
                ? "Note that USD / ETH on Goerli is different than on mainnet"
                : ""
            }
            prefixAction={() => setIsEth((isEth) => !isEth)}
            value={isEth ? ethValue || "" : usdValue || ""}
            onChange={handleChange}
            disabled={disabled}
            error={error}
            required={required}
            question={question}
          />
        )}
        {ethValue != 0 && (
          <div
            className={`absolute bottom-0 right-0 flex items-center pb-3 ${
              marginLabel || "mr-8"
            }`}
          >
            <p className="text-sm text-gray-600">
              {destinationCurrency}{" "}
              {isEth
                ? usdValue
                  ? Math.floor(usdValue * 100) / 100
                  : 0
                : ethValue
                ? Math.floor(ethValue * 10000) / 10000
                : 0}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default InputPrice
