import { useState, Dispatch, SetStateAction } from "react"
import { InputPrice, InputSwitch, CardBasic } from "@components/ui"
import {
  strategiesList,
  Strategy
} from "@components/priceStrategies/strategies"

type Props = {
  isFree: boolean
  ethValue: number
  usdValue: number
  isUSD: boolean
  isLimited: boolean
  setEthValue: Dispatch<SetStateAction<number>>
  setUsdValue: Dispatch<SetStateAction<number>>
  setIsUSD: Dispatch<SetStateAction<boolean>>
  setPriceParams: Dispatch<SetStateAction<any>>
}

const AddProductFormPrice = ({
  isFree,
  ethValue,
  usdValue,
  isUSD,
  isLimited,
  setEthValue,
  setUsdValue,
  setIsUSD,
  setPriceParams
}: Props) => {
  const [priceStrategy, setPriceStrategy] = useState<Strategy>(
    strategiesList[0]
  )

  const StrategyComponent =
    priceStrategy != undefined && priceStrategy.Component

  const handleSetStrategy = (label: string) => {
    setPriceStrategy(strategiesList.find((strategy) => strategy.label == label))
  }

  return (
    <>
      <h2 className="pb-6">Pricing strategy</h2>
      <div className="grid grid-cols-2 gap-2 pt-3 pb-6 sm:grid-cols-3">
        {strategiesList.map((strategy, i) => (
          <CardBasic
            key={i}
            label={strategy.label}
            isActive={strategy.label == priceStrategy.label}
            setisActive={handleSetStrategy}
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
          />
          <InputSwitch
            label="Dynamic pricing"
            questionText={
              <>
                <p>
                  If enabled, the buyer will pay in ETH the corresponding USD
                  value set
                  {usdValue && usdValue != 0 && (
                    <b> ${Number(usdValue).toFixed(2)}</b>
                  )}
                  . It&apos;s like setting the product price in USD and thus{" "}
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
          />
          {isFree ? (
            <p className="text-yellow-600">
              <b>
                If a price is not set this product can be purchased for free
              </b>
            </p>
          ) : null}
        </>
      ) : (
        <StrategyComponent
          setPriceParams={setPriceParams}
          isLimited={isLimited}
        />
      )}
      <div>
        <hr className="w-20 mx-auto border-gray-300 my-14" />
      </div>
    </>
  )
}

export default AddProductFormPrice
