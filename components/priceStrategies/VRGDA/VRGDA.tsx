import { CardBasic, Input } from "@components/ui"
import toWad from "@utils/toWad"
import { useEffect, useState } from "react"
import {
  strategiesList,
  Strategy,
  StrategyParams,
  StrategyProps
} from "../strategies"

type VRGDAStrategyProps = StrategyProps & {
  units: number
}

const label = "VRGDA"

const Component = ({ setPriceParams, units }: VRGDAStrategyProps) => {
  const [rate, setRate] = useState<"Linear" | "Logistic">("Linear")
  const [targetPrice, setTargetPrice] = useState(0)
  const [priceDecayPercent, setPriceDecayPercent] = useState(0)
  const [timeFactor, setTimeFactor] = useState(0)
  const strategy = strategiesList[rate + label]

  useEffect(() => {
    if (units != 0) {
      const { label, abi, deployments } = strategy

      let newPriceParams: StrategyParams = {
        label,
        address: deployments[process.env.NEXT_PUBLIC_CHAIN_ID],
        abi,
        args: [
          toWad(targetPrice),
          toWad(priceDecayPercent / 100),
          toWad(
            rate == "Linear"
              ? timeFactor
              : timeFactor != 0
              ? Math.floor(100000 / timeFactor) / 100000
              : 0
          )
        ]
      }

      setPriceParams(newPriceParams)
    }

    // TODO: FIX LOGISTIC PARAMS (price too high, doesn't correspond)
    // TODO: ADD VRGDA GRAPH

    return () => {
      setPriceParams(undefined)
    }
  }, [units, targetPrice, priceDecayPercent, timeFactor, setPriceParams])

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

      {units == 0 ? (
        <p className="pt-4 text-yellow-600">
          Enable <strong>limited availability</strong> to use a VRGDA strategy.
        </p>
      ) : (
        <>
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
            <Input
              type="number"
              label="Target price (ETH)"
              placeholder={"0.01"}
              min={0.001}
              step={0.001}
              question={
                <>
                  <p>Target price for the product if sold on pace.</p>
                </>
              }
              value={targetPrice || ""}
              onChange={setTargetPrice}
              required
            />
          </div>
          <div>
            <Input
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
                type="number"
                label="Time scale (days)"
                helpText={`After how many days 46% of the available units (${(
                  units * 0.46
                ).toFixed(2)}) should be sold?`}
                placeholder={"420"}
                min={0.1}
                max={100000}
                step={0.1}
                value={timeFactor || ""}
                onChange={setTimeFactor}
                question={
                  <>
                    <p>
                      Time scale controls the steepness of the logistic curve,
                      which affects how quickly the curve&apos;s asymptote is
                      reached.
                    </p>
                  </>
                }
                required
              />
            )}
          </div>
        </>
      )}
    </>
  )
}

const hook: Strategy = { label, Component }

export default hook
