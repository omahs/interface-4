import * as hooks from "./index"

export type Hook = {
  label: string
  description: string
  Component: (args: any) => JSX.Element
  factoryAddresses?: { [chainId: number]: string }
}

export const defaultCheckSelector = "0x95db9368"
export const defaultExecSelector = "0xa23fffb9"

export const defaultPurchaseHooks: Hook[] = [
  hooks.ERC20Gate,
  hooks.Allowlist,
  hooks.SendETH,
  hooks.ExistingHook
]

export const purchaseHooks: Hook[] = Object.values(hooks)
