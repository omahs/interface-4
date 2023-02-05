import { Dispatch, SetStateAction, useEffect } from "react"
import { InputPrice, InputSwitch, CardBasic, NoteText } from "@components/ui"
import {
  strategiesRender,
  Strategy,
  StrategyParams
} from "@components/priceStrategies/strategies"

type Props = {
  isFree: boolean
  ethValue: number
  usdValue: number
  isUSD: boolean
  units: number
  priceParams: StrategyParams
  priceStrategy: Strategy
  setEthValue: Dispatch<SetStateAction<number>>
  setUsdValue: Dispatch<SetStateAction<number>>
  setIsUSD: Dispatch<SetStateAction<boolean>>
  setPriceParams: Dispatch<SetStateAction<StrategyParams>>
  setPriceStrategy: Dispatch<SetStateAction<Strategy>>
  disabled?: boolean
}

const AddProductFormPrice = ({
  isFree,
  ethValue,
  usdValue,
  isUSD,
  units,
  priceParams,
  priceStrategy,
  setEthValue,
  setUsdValue,
  setIsUSD,
  setPriceParams,
  setPriceStrategy,
  disabled
}: Props) => {
  const StrategyComponent =
    priceStrategy != undefined && priceStrategy.Component

  const handleSetStrategy = (chosenStrategy: string) => {
    setPriceStrategy(
      strategiesRender.find((strategy) => strategy.label == chosenStrategy)
    )

    const data = { address: "", fields: {} }

    // Set strategy defaults
    switch (chosenStrategy) {
      case "VRGDA":
        if (!data.fields["rate"]) data.fields["rate"] = "Linear"
        break
    }

    setPriceParams(data)
  }

  useEffect(() => {
    if (priceStrategy.label != "Standard") {
      setEthValue(0)
      setUsdValue(0)
      if (priceStrategy.label == "VRGDA") {
        const data = { ...priceParams }
        if (!data.fields) {
          data.fields = {}
        }
        if (!data.fields["rate"]) {
          data.fields["rate"] = "Linear"
        }
        setPriceParams(data)
      }
    }
  }, [priceStrategy])

  return (
    <>
      <div className="grid grid-cols-3 gap-2 pb-6 sm:grid-cols-3">
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
                  If enabled, the product will be priced in USD{" "}
                  {usdValue != 0 && <b>(${Number(usdValue).toFixed(2)})</b>} and
                  the ETH amount to be paid is calculated at the moment of
                  purchase.
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
          priceParams={priceParams}
          setPriceParams={setPriceParams}
          units={units}
          disabled={disabled}
        />
      )}
    </>
  )
}

export default AddProductFormPrice
