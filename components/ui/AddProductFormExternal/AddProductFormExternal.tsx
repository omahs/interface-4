import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { CardText } from "../"
import {
  defaultPurchaseHooks,
  emptyExternalCall,
  Params
} from "@components/hooks/purchaseHooks"

type Props = {
  params: Params
  setParams: Dispatch<SetStateAction<Params>>
}

const AddProductFormExternal = ({ params, setParams }: Props) => {
  const chainId = process.env.NEXT_PUBLIC_CHAIN_ID
  const [selectedHook, setSelectedHook] = useState(undefined)
  const displayedHook =
    selectedHook != undefined && defaultPurchaseHooks[selectedHook]

  const HookComponent = selectedHook != undefined && displayedHook.Component

  useEffect(() => {
    setParams({ externalCall: emptyExternalCall })
  }, [selectedHook])

  return (
    <>
      <h2 className="pb-6">Purchase hook</h2>
      <p className="pb-3">
        Add optional on-chain logic to purchases with pre-configured or custom
        hooks.
      </p>
      <div className="space-y-3">
        {defaultPurchaseHooks.map((hook, i) => {
          const { label } = hook
          const isActive = selectedHook == i
          const isFactory = hook.factoryAddresses != undefined

          return (
            (!isFactory || (isFactory && hook.factoryAddresses[chainId])) && (
              <div
                key={i}
                onClick={() =>
                  isActive ? setSelectedHook(undefined) : setSelectedHook(i)
                }
              >
                <CardText label={label} isActive={isActive} />
              </div>
            )
          )
        })}
      </div>
      {selectedHook != undefined && (
        <>
          <p className="pt-6 pb-3 font-semibold">{displayedHook.description}</p>
          <HookComponent params={params} setParams={setParams} />
          {displayedHook.factoryAddresses &&
            displayedHook.factoryAddresses[chainId] && (
              <p className="pt-6 font-semibold text-yellow-600">
                Deploying this purchase hook requires an additional on-chain
                transaction
              </p>
            )}
        </>
      )}
      <div>
        <hr className="w-20 mx-auto border-gray-300 my-14" />
      </div>
    </>
  )
}

export default AddProductFormExternal
