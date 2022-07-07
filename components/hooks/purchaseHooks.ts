import * as hooks from "./index"

export type Hook = {
  label: string
  description: string
  Component: (args: any) => JSX.Element
  factoryAddress?: string
}

const purchaseHooks: Hook[] = Object.values(hooks)

export default purchaseHooks
