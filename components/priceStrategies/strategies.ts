import { ContractInterface } from "ethers"
import { Dispatch, SetStateAction } from "react"
import * as strategies from "./index"

export type Strategy = {
  label: string
  Component: (args: any) => JSX.Element
}

export type StrategyProps = {
  isLimited: boolean
  setPriceParams: Dispatch<SetStateAction<StrategyParams>>
}

export type StrategyParams = {
  address: string
  abi?: ContractInterface
  args?: any[]
}

export const strategiesList: Strategy[] = [
  { label: "Standard", Component: () => null },
  strategies.VRGDA,
  strategies.Custom
]
