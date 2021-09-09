import { Input } from "@components/ui"
import fetcher from "@utils/fetcher"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import useSWR from "swr"

type Props = {
  ethValue: number
  usdValue: number
  setEthValue: Dispatch<SetStateAction<number>>
  setUsdValue: Dispatch<SetStateAction<number>>
  loading?: boolean
  error?: boolean
  required?: boolean
  label?: string
  actionLabel?: string
  marginLabel?: string
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
  label,
  actionLabel,
  marginLabel,
  action,
}: Props) => {
  const { data } = useSWR(
    "https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT",
    fetcher
  )
  const [isEth, setIsEth] = useState(true)

  const currency = isEth ? "Ξ" : "$"
  const destinationCurrency = isEth ? "$" : "Ξ"

  const handleChange = (value) => {
    if (isEth) {
      setEthValue(value)
      setUsdValue(value * Number(data?.price))
    } else {
      setUsdValue(value)
      setEthValue(value / Number(data?.price))
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
    <div className="w-full max-w-sm mx-auto space-y-6">
      <div className="relative">
        {action ? (
          <Input
            type="number"
            placeholder={isEth ? "0.01" : "100"}
            label={label}
            prefix={currency}
            prefixAction={() => setIsEth((isEth) => !isEth)}
            value={isEth ? ethValue || "" : usdValue || ""}
            onChange={handleChange}
            onClick={() => action()}
            onClickLabel={actionLabel}
            loading={loading}
            error={error}
            required={required}
          />
        ) : (
          <Input
            type="number"
            placeholder={isEth ? "0.01" : "100"}
            label={label}
            prefix={currency}
            prefixAction={() => setIsEth((isEth) => !isEth)}
            value={isEth ? ethValue || "" : usdValue || ""}
            onChange={handleChange}
            disabled={loading}
            error={error}
            required={required}
          />
        )}
        <div
          className={`absolute top-0 right-0 flex items-center h-full pb-0.5 ${
            marginLabel || "mr-8"
          }
          ${label ? "pt-7" : ""}`}
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
      </div>
    </div>
  )
}

export default InputPrice
