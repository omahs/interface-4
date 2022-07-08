import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { CardText } from "../"
import { defaultPurchaseHooks } from "@components/hooks/purchaseHooks"

type Props = {
  params: any
  setParams: Dispatch<SetStateAction<any>>
}

const AddProductFormExternal = ({ params, setParams }: Props) => {
  const [selectedHook, setSelectedHook] = useState(undefined)
  const chainId = process.env.NEXT_PUBLIC_CHAIN_ID

  const HookComponent =
    selectedHook != undefined && defaultPurchaseHooks[selectedHook].Component

  useEffect(() => {
    setParams({})
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
          <p className="pt-6 pb-3 font-semibold text-yellow-600">
            {defaultPurchaseHooks[selectedHook].description}
          </p>
          <HookComponent params={params} setParams={setParams} />
        </>
      )}
      <div>
        <hr className="w-20 mx-auto border-gray-300 my-14" />
      </div>
    </>
  )
}

export default AddProductFormExternal
