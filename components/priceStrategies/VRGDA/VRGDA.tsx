import { CardBasic, Input, InputPrice } from "@components/ui"
import toWad from "@utils/toWad"
import { useEffect, useState } from "react"
import { Strategy, StrategyProps } from "../strategies"
import linearVrgdaInterface from "./LinearVRGDAPrices.json"

const label = "VRGDA"

const strategy = {
  Linear: {
    address: "",
    abi: linearVrgdaInterface.abi
  },
  Logistic: {
    address: "",
    abi: linearVrgdaInterface.abi
  }
}

const Component = ({ setPriceParams, isLimited }: StrategyProps) => {
  const [rate, setRate] = useState<"Linear" | "Logistic">("Linear")
  const [targetPrice, setTargetPrice] = useState(0)
  const [targetPriceUsd, setTargetPriceUsd] = useState(0)
  const [priceDecayPercent, setPriceDecayPercent] = useState(0)
  const [timeFactor, setTimeFactor] = useState(0)

  useEffect(() => {
    setPriceParams({
      strategy: strategy[rate],
      args: [toWad(targetPrice), toWad(priceDecayPercent), toWad(timeFactor)]
    })

    return () => {
      setPriceParams(undefined)
    }
  }, [targetPrice, priceDecayPercent, timeFactor, setPriceParams])

  useEffect(() => {
    setTimeFactor(0)
  }, [rate])

  return (
    <>
      <p>
        Use a dynamic price based on a{" "}
        <a
          href="https://www.paradigm.xyz/2022/08/vrgda"
          target="_blank"
          rel="noreferrer"
          className="highlight"
        >
          VRGDA strategy
        </a>
        .
      </p>

      <div className="grid grid-cols-2 gap-2 pt-3 pb-6">
        <CardBasic
          label="Linear"
          isActive={rate == "Linear"}
          setisActive={setRate}
        />
        <CardBasic
          label="Logistic"
          isActive={rate == "Logistic"}
          setisActive={setRate}
        />
      </div>
      <div>
        <InputPrice
          disabled={!isLimited}
          ethValue={targetPrice}
          setEthValue={setTargetPrice}
          usdValue={targetPriceUsd}
          setUsdValue={setTargetPriceUsd}
          label="Target price"
          question={
            <>
              <p>Target price for the product if sold on pace.</p>
            </>
          }
          required
        />
      </div>
      <div>
        <Input
          disabled={!isLimited}
          type="number"
          label="Price decay (%)"
          placeholder={"10"}
          min={0.01}
          max={99.99}
          step={0.01}
          question={
            <>
              <p>The daily percent price decay, with no sales.</p>
            </>
          }
          value={priceDecayPercent || ""}
          onChange={setPriceDecayPercent}
          required
        />
      </div>
      <div>
        {rate == "Linear" ? (
          <Input
            disabled={!isLimited}
            type="number"
            label="Daily units to be sold"
            placeholder={"2"}
            min={0.01}
            step={0.01}
            value={timeFactor || ""}
            onChange={setTimeFactor}
            question={
              <>
                <p>The number of units to target selling in 1 day</p>
              </>
            }
            required
          />
        ) : (
          <Input
            disabled={!isLimited}
            type="number"
            label="Time scale"
            placeholder={"0.001"}
            min={0.0001}
            step={0.0001}
            value={timeFactor || ""}
            onChange={setTimeFactor}
            question={
              <>
                <p>
                  Time scale controls the steepness of the logistic curve, which
                  affects how quickly the curve&apos;s asymptote is reached.
                </p>
              </>
            }
            required
          />
        )}
      </div>
      {!isLimited && (
        <p className="pt-4 text-yellow-600">
          You need to enable <strong>limited availability</strong> to use a
          VRGDA strategy.
        </p>
      )}
    </>
  )
}

const hook: Strategy = { label, Component }

export default hook
