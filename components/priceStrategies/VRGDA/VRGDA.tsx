import { CardBasic, ChartVRGDASchedule, Input, NoteText } from "@components/ui"
import formatNumber from "@utils/formatNumber"
import toWad from "@utils/toWad"
import { useEffect } from "react"
import {
  strategiesList,
  Strategy,
  StrategyParams,
  StrategyProps
} from "../strategies"
import constants from "constants.json"

type VRGDAStrategyProps = StrategyProps & {
  units: number
}

const label = "VRGDA"

const Component = ({
  priceParams,
  setPriceParams,
  units,
  disabled
}: VRGDAStrategyProps) => {
  const { rate, targetPrice, min, priceDecayPercent, timeFactor } =
    priceParams?.fields || {}
  const strategy = strategiesList[rate + label]

  const handleSetRate = (value: string) => {
    const data = { ...priceParams }
    if (!data.fields) data.fields = {}
    data.fields["rate"] = value
    if (value != rate) {
      data.fields["timeFactor"] = 0
    }
    setPriceParams(data)
  }
  const handleSetTargetPrice = (value: number) => {
    const data = { ...priceParams }
    data.fields["targetPrice"] = value
    setPriceParams(data)
  }
  const handleSetMin = (value: number) => {
    const data = { ...priceParams }
    data.fields["min"] = value
    setPriceParams(data)
  }
  const handleSetPriceDecayPercent = (value: number) => {
    const data = { ...priceParams }
    data.fields["priceDecayPercent"] = value
    setPriceParams(data)
  }
  const handleSetTimeFactor = (value: number) => {
    const data = { ...priceParams }
    data.fields["timeFactor"] = value
    setPriceParams(data)
  }

  useEffect(() => {
    if (units != 0) {
      const { label, abi } = strategy
      const address =
        constants[process.env.NEXT_PUBLIC_CHAIN_ID][
          process.env.NEXT_PUBLIC_ENVIRONMENT
        ].strategies[label]

      const newPriceParams: StrategyParams = {
        ...priceParams,
        label,
        address,
        abi,
        args: [
          [
            [
              targetPrice ? toWad(targetPrice) : 0,
              min ? toWad(min) : 0,
              timeFactor
                ? toWad(
                    rate == "Linear"
                      ? timeFactor
                      : timeFactor != 0
                      ? Math.floor(100000 / timeFactor) / 100000
                      : 0
                  )
                : 0
            ]
          ],
          priceDecayPercent ? toWad(Number(priceDecayPercent) / 100) : 0
        ]
      }

      setPriceParams(newPriceParams)
    }
  }, [strategy, units, targetPrice, min, priceDecayPercent, timeFactor])

  return (
    <>
      <p className="text-gray-600">
        Set a dynamic price according to a sale schedule, based on a{" "}
        <a
          href="https://www.paradigm.xyz/2022/08/vrgda"
          target="_blank"
          rel="noreferrer"
          className="highlight"
        >
          VRGDA
        </a>
        .
      </p>
      {units == 0 ? (
        <div className="text-left">
          <NoteText text="Enable limited availability to use a VRGDA strategy" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-2 pt-3 pb-6">
            <CardBasic
              label="Linear"
              isActive={rate == "Linear"}
              setisActive={handleSetRate}
            />
            <CardBasic
              label="Logistic"
              isActive={rate == "Logistic"}
              setisActive={handleSetRate}
            />
          </div>
          <div>
            <Input
              type="number"
              label="Target price (ETH)*"
              helpText="How much should the product cost if sales are on schedule?"
              placeholder={"0.1"}
              min={0.001}
              step={0.001}
              question={
                <>
                  <p>Target price for the product if sold on pace.</p>
                </>
              }
              value={targetPrice || ""}
              onChange={handleSetTargetPrice}
              disabled={disabled}
              required
            />
          </div>
          <div>
            <Input
              type="number"
              label="Min price (ETH)"
              helpText="What is the minimum sale price?"
              placeholder={"Leave blank to disable"}
              min={0}
              step={0.001}
              question={
                <>
                  <p>
                    Can be used to prevent sale price to decay below a minimum
                    value.
                  </p>
                </>
              }
              value={min || ""}
              onChange={handleSetMin}
              disabled={disabled}
            />
          </div>
          <div>
            <Input
              type="number"
              label="Daily price decay (%)*"
              helpText="How much should the price drop in 1 day if there are no sales?"
              placeholder={"10"}
              min={0.01}
              max={99.99}
              step={0.01}
              question={
                <>
                  <p>The daily percent price decay, with no sales.</p>
                  <p>
                    A high percentage causes significant price variations, while
                    low values reduce deviation from target price based on time
                    and sales.
                  </p>
                </>
              }
              value={priceDecayPercent || ""}
              onChange={handleSetPriceDecayPercent}
              disabled={disabled}
              required
            />
          </div>
          <div>
            {rate == "Linear" ? (
              <Input
                type="number"
                label="Daily units to be sold*"
                placeholder={"2"}
                min={0.01}
                step={0.01}
                value={timeFactor || ""}
                onChange={handleSetTimeFactor}
                question={
                  <>
                    <p>The number of units to target selling in 1 day</p>
                  </>
                }
                disabled={disabled}
                required
              />
            ) : (
              <Input
                type="number"
                label="Time scale (days)*"
                helpText={`After how many days ${formatNumber(
                  Math.floor(units * 46) / 100
                )} units (46% of total) should be sold?`}
                placeholder={"420"}
                min={0.1}
                max={100000}
                step={0.1}
                value={timeFactor || ""}
                onChange={handleSetTimeFactor}
                question={
                  <>
                    <p>
                      Time scale controls the steepness of the logistic curve,
                      which affects how quickly the curve&apos;s asymptote is
                      reached.
                    </p>
                  </>
                }
                disabled={disabled}
                required
              />
            )}
          </div>
          <ChartVRGDASchedule
            rate={rate}
            units={units}
            timeFactor={timeFactor}
          />
          <p className="pt-12">
            {rate == "Linear" ? (
              <>
                You plan to sell <b>{formatNumber(Number(units))} units</b> in{" "}
                <b>
                  {timeFactor
                    ? formatNumber(Math.floor((100 * units) / timeFactor) / 100)
                    : "..."}{" "}
                  days
                </b>{" "}
                with a{" "}
                <b>target price of {targetPrice ? targetPrice : "..."} ETH</b>
                {min ? (
                  <>
                    {" "}
                    and a <b>minimum price of {min} ETH</b>
                  </>
                ) : (
                  ""
                )}
                .
              </>
            ) : (
              <>
                You plan to sell{" "}
                <b>
                  {formatNumber(Math.floor(units * 46) / 100)} out of{" "}
                  {formatNumber(Number(units))} units
                </b>{" "}
                in{" "}
                <b>
                  {timeFactor ? formatNumber(Number(timeFactor)) : "..."} days
                </b>{" "}
                with a target price of{" "}
                <b>{targetPrice ? targetPrice : "..."} ETH</b>.
              </>
            )}
          </p>
          <p>
            Sales will earn more than the target price when ahead of the
            schedule, and less if behind.
            {/* MAKE SURE THIS IS CORRECT BEFORE ADDING IT */}
          </p>
          {rate == "Linear" ? (
            <p>
              Price will decrease{" "}
              <b>
                daily by{" "}
                {priceDecayPercent && timeFactor
                  ? formatNumber(
                      Math.floor((priceDecayPercent * 100) / timeFactor) / 100
                    ) + "% "
                  : "... "}{" "}
                for each unit
              </b>{" "}
              behind schedule, or increase by the same amount if ahead.
            </p>
          ) : (
            <p>
              Price will decrease{" "}
              <b>
                daily by {priceDecayPercent ? priceDecayPercent + "% " : "..."}
              </b>{" "}
              if there are no sales.
            </p>
          )}
          {/* TODO: How to write this for logistic VRGDA? */}
        </>
      )}
    </>
  )
}

const hook: Strategy = { label, Component }

export default hook
