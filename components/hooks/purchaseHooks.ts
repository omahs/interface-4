import React from "react"
import * as hooks from "./index"

type Hook = {
  label: string
  description: string
  component: (args: any) => JSX.Element
  // factoryAddress: string
}

const purchaseHooks: Hook[] = [
  {
    label: "ERC20 token-gate",
    description: "",
    component: React.Fragment
  },
  {
    label: "Allowlist",
    description: "",
    component: React.Fragment
  },
  {
    label: "Send ETH to address",
    description: "Send ETH to an external address.",
    component: React.Fragment
  },
  {
    label: "Existing hook",
    description:
      "Send ETH to an external address and/or execute on-chain logic by linking it to an existing hook.",
    component: hooks.ExistingHook
  }
]

export default purchaseHooks
