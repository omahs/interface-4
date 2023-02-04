import { InputAddress, InputPrice } from "@components/ui"
import { ethers, BigNumber } from "ethers"
import { useEffect, useState } from "react"
import { Hook, HookProps } from "../purchaseHooks"

type Props = HookProps & { ethProductPrice: number }

const label = "Send ETH to address"

const description = "Send ETH to an external address"

const Component = ({ ethProductPrice, setParams }: Props) => {
  const [address, setAddress] = useState("")
  const [resolvedAddress, setResolvedAddress] = useState("")
  const [usdValue, setUsdValue] = useState(0)
  const [ethValue, setEthValue] = useState(0)

  console.log(ethProductPrice)

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
        <p className="text-sm font-medium text-left text-gray-600">
          Total price (incl. standard price): Ξ{" "}
          {Math.round((Number(ethProductPrice) + Number(ethValue)) * 1000) /
            1000}
        </p>
      </div>
    </>
  )
}

const hook: Hook = { label, description, Component }

export default hook
