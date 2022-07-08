import { Dispatch, SetStateAction } from "react"
import * as hooks from "./index"

export type Hook = {
  label: string
  description: string
  Component: (args: any) => JSX.Element
  factoryAddresses?: { [chainId: number]: string }
}

export type HookProps = {
  setParams: Dispatch<SetStateAction<any>>
}

export const defaultCheckSelector = "0x95db9368"
export const defaultExecSelector = "0xa23fffb9"
export const defaultExternalCall = {
  data: [],
  value: 0,
  externalAddress: "",
  checkFunctionSignature: defaultCheckSelector,
  execFunctionSignature: defaultExecSelector
}

export const defaultPurchaseHooks: Hook[] = [
  hooks.ERC20Gated,
  hooks.Allowlisted,
  hooks.SendETH,
  hooks.ExistingHook
]

export const purchaseHooks: Hook[] = Object.values(hooks)
