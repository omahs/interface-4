import { InputAddress, InputPrice } from "@components/ui"
import { ethers, BigNumber } from "ethers"
import { useEffect, useState } from "react"
import { Hook, HookProps } from "../purchaseHooks"

const label = "Send ETH to address"

const description = "Send ETH to an external address"

const Component = ({ setParams }: HookProps) => {
  const [address, setAddress] = useState("")
  const [resolvedAddress, setResolvedAddress] = useState("")
  const [usdValue, setUsdValue] = useState(0)
  const [ethValue, setEthValue] = useState(0)

  useEffect(() => {
    const externalAddress = address
      ? address.substring(address.length - 4) !== ".eth"
        ? resolvedAddress != "Invalid ENS name"
          ? address
          : ethers.constants.AddressZero
        : resolvedAddress
      : ethers.constants.AddressZero
    const decimals = BigNumber.from(10).pow(9)
    const ethToWei = BigNumber.from((ethValue * 10 ** 9).toFixed(0)).mul(
      decimals
    )
    setParams({
      externalCall: {
        data: [],
        value: ethToWei,
        externalAddress,
        checkFunctionSignature: "0x00000000",
        execFunctionSignature: "0x00000000"
      }
    })
  }, [ethValue, usdValue, address, resolvedAddress])

  return (
    <>
      <div>
        <InputAddress
          label="Address"
          address={address}
          onChange={setAddress}
          required
          resolvedAddress={resolvedAddress}
          setResolvedAddress={setResolvedAddress}
        />
      </div>
      <div className="py-3">
        <InputPrice
          ethValue={ethValue}
          setEthValue={setEthValue}
          usdValue={usdValue}
          setUsdValue={setUsdValue}
          label="Value per unit"
          required
        />
      </div>

      <p className="text-yellow-600">
        <b>The sent value will be added to the unit product price.</b>
      </p>
    </>
  )
}

const hook: Hook = { label, description, Component }

export default hook
