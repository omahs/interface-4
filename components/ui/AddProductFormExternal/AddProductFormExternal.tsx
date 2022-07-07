import React, { Dispatch, SetStateAction, useState } from "react"
import { FunctionStruct } from "types/typechain/ProductsModule"
import { CardText } from "../"
import purchaseHooks from "@components/hooks/purchaseHooks"

type Props = {
  allowedAddresses: string[]
  setExternalCall: Dispatch<SetStateAction<FunctionStruct>>
  setAllowedAddresses: Dispatch<SetStateAction<string[]>>
}

const AddProductFormExternal = ({
  allowedAddresses,
  setExternalCall,
  setAllowedAddresses
}: Props) => {
  const [selectedHook, setSelectedHook] = useState(undefined)

  const HookComponent = selectedHook && purchaseHooks[selectedHook].component

  return (
    <>
      <h2 className="pb-6">Purchase hook</h2>
      <p className="pb-3">
        Add on-chain logic to purchases with pre-configured or custom hooks.
      </p>
      <div className="space-y-3">
        {purchaseHooks.map((hook, i) => {
          const { label } = hook
          const isActive = selectedHook == i

          return (
            <div
              key={i}
              onClick={() =>
                isActive ? setSelectedHook(undefined) : setSelectedHook(i)
              }
            >
              <CardText label={label} isActive={isActive} />
            </div>
          )
        })}
      </div>
      {selectedHook ? (
        <>
          <p className="pt-6 pb-3 font-semibold text-yellow-600">
            {purchaseHooks[selectedHook].description}
          </p>
          {/* TODO: Review condition */}
          {selectedHook === 3 ? (
            <HookComponent
              allowedAddresses={allowedAddresses}
              setExternalCall={setExternalCall}
              setAllowedAddresses={setAllowedAddresses}
            />
          ) : (
            <HookComponent />
          )}
        </>
      ) : null}
      <div>
        <hr className="w-20 mx-auto border-gray-300 my-14" />
      </div>
    </>
  )
}

export default AddProductFormExternal
