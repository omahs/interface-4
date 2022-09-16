import { ContractInterface } from "ethers"
import { Dispatch, SetStateAction } from "react"
import * as strategies from "./index"
import linearVrgdaInterface from "./VRGDA/LinearVRGDAPrices.json"

export type Strategy = {
  label: string
  Component: (args: any) => JSX.Element
}

export type StrategyProps = {
  setPriceParams: Dispatch<SetStateAction<StrategyParams>>
}

export type StrategyParams = {
  label: string
  address: string
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
    abi: linearVrgdaInterface.abi,
    deployments: {
      4: "0x0a0866FaEe7896591e5E252C2A0FdC6949E191bE"
    }
  },
  LogisticVRGDA: {
    label: "Logistic VRGDA",
    abi: linearVrgdaInterface.abi,
    deployments: {
      4: ""
    }
  }
}
