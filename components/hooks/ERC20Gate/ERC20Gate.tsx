import { Input, InputAddress } from "@components/ui"
import { BigNumber } from "ethers"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import {
  defaultCheckSelector,
  defaultExecSelector,
  Hook
} from "../purchaseHooks"
import factoryInterface from "./interface.json"

const label = "ERC20 token-gate"

const description =
  "Allow purchases only from buyers with the specified amount of ERC20 tokens"

const factoryAddresses = {
  1: "",
  4: "0xfbe8feE9e3f0fb7d8271e7c88Cc3d7B575265564"
}

type Props = {
  setParams: Dispatch<SetStateAction<any>>
}

const Component = ({ setParams }: Props) => {
  const [address, setAddress] = useState("")
  const [resolvedAddress, setResolvedAddress] = useState("")
  const [gateAmount, setGateAmount] = useState(0)

  useEffect(() => {
    setParams({
      externalCall: {
        data: [],
        value: 0,
        externalAddress: "",
        checkFunctionSignature: defaultCheckSelector,
        execFunctionSignature: defaultExecSelector
      },
      deploy: {
        factoryAddresses,
        abi: factoryInterface.abi,
        args: [address, BigNumber.from(10).pow(18).mul(33)]
      }
    })
  }, [address, gateAmount])

  return (
    <>
      <div>
        <InputAddress
          label="ERC20 contract address"
          address={address}
          onChange={setAddress}
          resolvedAddress={resolvedAddress}
          setResolvedAddress={setResolvedAddress}
          placeholder="0x…"
          required
        />
      </div>
      <div>
        <Input
          type="number"
          label="Token gate amount (mul by 10^18)"
          value={gateAmount}
          onChange={setGateAmount}
          required
        />
      </div>
    </>
  )
}

const hook: Hook = { label, description, Component, factoryAddresses }

export default hook
