import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { CardText, DeployCloneSwitch, NoteText } from "../"
import {
  defaultPurchaseHooks,
  emptyExternalCall,
  HookParams
} from "@components/hooks/purchaseHooks"

type Props = {
  selectedHook: number
  ethProductPrice: number
  clonePurchaseHook: boolean
  params: HookParams
  setClonePurchaseHook: Dispatch<SetStateAction<boolean>>
  setSelectedHook: Dispatch<SetStateAction<number>>
  setParams: Dispatch<SetStateAction<HookParams>>
}

const AddProductFormExternal = ({
  selectedHook,
  setSelectedHook,
  ethProductPrice,
  clonePurchaseHook,
  setClonePurchaseHook,
  params,
  setParams
}: Props) => {
  const chainId = process.env.NEXT_PUBLIC_CHAIN_ID
  const displayedHook =
    selectedHook != undefined && defaultPurchaseHooks[selectedHook]

  const HookComponent = selectedHook != undefined && displayedHook.Component

  const handleSelectHook = (i: number) => {
    setParams({ externalCall: emptyExternalCall })
    selectedHook == i ? setSelectedHook(undefined) : setSelectedHook(i)
    if (
      displayedHook?.deployments?.cloner[chainId] &&
      !displayedHook?.deployments?.factory[chainId]
    ) {
      setClonePurchaseHook(true)
    } else {
      setClonePurchaseHook(false)
    }
  }

  return (
    <>
      <div className="pb-10">
        <h1 className="pb-6">On-chain action</h1>
        <p className="font-medium text-gray-600">
          Execute on-chain logic when the product is purchased
        </p>
      </div>
      <div className="space-y-3">
        {defaultPurchaseHooks.map((hook, i) => {
          const { label, deployments } = hook
          const isActive = selectedHook == i

          return (
            (!deployments ||
              deployments.cloner[chainId] ||
              deployments.factory[chainId]) && (
              <div key={i} onClick={() => handleSelectHook(i)}>
                <CardText label={label} isActive={isActive} />
              </div>
            )
          )
        })}
      </div>
      {selectedHook != undefined && (
        <>
          <p className="pt-6 pb-3 font-medium text-gray-600">
            {displayedHook.description}
          </p>
          <HookComponent
            ethProductPrice={ethProductPrice}
            params={params}
            setParams={setParams}
          />

          <DeployCloneSwitch
            deployments={displayedHook?.deployments}
            clonePurchaseHook={clonePurchaseHook}
            setClonePurchaseHook={setClonePurchaseHook}
          />
          {displayedHook.deployments && (
            <NoteText text="This action requires an additional transaction" />
          )}
        </>
      )}
    </>
  )
}

export default AddProductFormExternal
