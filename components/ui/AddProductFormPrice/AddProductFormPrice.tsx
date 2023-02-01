import { useState, Dispatch, SetStateAction, useEffect } from "react"
import { InputPrice, InputSwitch, CardBasic, NoteText } from "@components/ui"
import {
  strategiesRender,
  Strategy
} from "@components/priceStrategies/strategies"

type Props = {
  isFree: boolean
  ethValue: number
  usdValue: number
  isUSD: boolean
  units: number
  setEthValue: Dispatch<SetStateAction<number>>
  setUsdValue: Dispatch<SetStateAction<number>>
  setIsUSD: Dispatch<SetStateAction<boolean>>
  setPriceParams: Dispatch<SetStateAction<any>>
  disabled?: boolean
}

const AddProductFormPrice = ({
  isFree,
  ethValue,
  usdValue,
  isUSD,
  units,
  setEthValue,
  setUsdValue,
  setIsUSD,
  setPriceParams,
  disabled
}: Props) => {
  const [priceStrategy, setPriceStrategy] = useState<Strategy>(
    strategiesRender[0]
  )

  const StrategyComponent =
    priceStrategy != undefined && priceStrategy.Component

  const handleSetStrategy = (label: string) => {
    setPriceStrategy(
      strategiesRender.find((strategy) => strategy.label == label)
    )
  }

  useEffect(() => {
    if (priceStrategy.label != "Standard") {
      setEthValue(0)
      setUsdValue(0)
    }
  }, [priceStrategy])

  return (
    <>
      <div className="grid grid-cols-3 gap-2 pt-3 pb-6 sm:grid-cols-3">
        {strategiesRender.map((strategy, i) => (
          <CardBasic
            key={i}
            label={strategy.label}
            isActive={strategy.label == priceStrategy.label}
            setisActive={handleSetStrategy}
            disabled={disabled}
          />
        ))}
      </div>
      {priceStrategy.label == "Standard" ? (
        <>
          <InputPrice
            ethValue={ethValue}
            setEthValue={setEthValue}
            usdValue={usdValue}
            setUsdValue={setUsdValue}
            label="Price per unit"
            disabled={disabled}
          />
          <InputSwitch
            label="Dynamic pricing"
            questionText={
              <>
                <p>
                  If enabled, the buyer will pay in ETH the corresponding USD
                  value set
                  {usdValue != 0 && <b> ${Number(usdValue).toFixed(2)}</b>}.
                  It&apos;s like setting the product price in USD and thus{" "}
                  <b>protects against changes in ETH value over time.</b>
                </p>
                <p>
                  <b>Note:</b> Products with dynamic pricing have a slightly
                  higher gas fee for the buyer.
                </p>
              </>
            }
            enabled={isUSD}
            setEnabled={setIsUSD}
            disabled={disabled}
          />
          {isFree ? (
            <div className="text-left">
              <NoteText text="If a price is not set this product can be purchased for free" />
            </div>
          ) : null}
        </>
      ) : (
        <StrategyComponent
          setPriceParams={setPriceParams}
          units={units}
          disabled={disabled}
        />
      )}
    </>
  )
}

export default AddProductFormPrice
