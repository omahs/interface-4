import { ContractInterface } from "ethers"
import { Dispatch, SetStateAction } from "react"
import * as strategies from "./index"
import linearVrgdaInterface from "./VRGDA/LinearVRGDAPrices.json"
import logisticVrgdaInterface from "./VRGDA/LogisticVRGDAPrices.json"

export type Strategy = {
  label: string
  Component: (args: any) => JSX.Element
}

export type StrategyProps = {
  setPriceParams: Dispatch<SetStateAction<StrategyParams>>
  disabled?: boolean
}

export type StrategyParams = {
  address: string
  label?: string
  abi?: ContractInterface
  args?: any[]
}

export const strategiesRender: Strategy[] = [
  { label: "Standard", Component: () => null },
  strategies.VRGDA,
  strategies.Custom
]

export const strategiesList = {
  LinearVRGDA: {
    label: "Linear VRGDA",
    abi: linearVrgdaInterface.abi
  },
  LogisticVRGDA: {
    label: "Logistic VRGDA",
    abi: logisticVrgdaInterface.abi
  }
}
