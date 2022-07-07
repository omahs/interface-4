import * as hooks from "./index"

export type Hook = {
  label: string
  description: string
  Component: (args: any) => JSX.Element
  factoryAddress?: { [chainId: number]: string }
}

export const defaultPurchaseHooks: Hook[] = [
  hooks.ERC20TokenGate,
  hooks.Allowlist,
  hooks.SendETH,
  hooks.ExistingHook
]

export const purchaseHooks: Hook[] = Object.values(hooks)
