import { InputAddress, InputPrice } from "@components/ui"
import useEthUsd from "@utils/useEthUsd"
import { ethers, BigNumber } from "ethers"
import { useEffect, useState } from "react"
import { Hook, HookProps } from "../purchaseHooks"

type Props = HookProps & { ethProductPrice: number }

const label = "Send ETH to address"

const description = "Send ETH to an external address"

const Component = ({ params, ethProductPrice, setParams }: Props) => {
  const ethUsd = useEthUsd()

  const paramsExternalAddress = params?.externalCall?.externalAddress
  const paramsValue = params?.externalCall?.value
  const initAddress =
    (paramsExternalAddress &&
      paramsExternalAddress != "0x00000000" &&
      paramsExternalAddress != ethers.constants.AddressZero &&
      paramsExternalAddress) ||
    ""
  const initValue = paramsValue
    ? Number(BigNumber.from(paramsValue).div(BigNumber.from(10).pow(18)))
    : 0
  const [address, setAddress] = useState(initAddress)
  const [resolvedAddress, setResolvedAddress] = useState("")
  const [usdValue, setUsdValue] = useState(initValue * ethUsd)
  const [ethValue, setEthValue] = useState(initValue)

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
          label="Receiver address*"
          address={address}
          onChange={setAddress}
          required
          resolvedAddress={resolvedAddress}
          setResolvedAddress={setResolvedAddress}
        />
      </div>
      <div className="py-3">
        <InputPrice
          label="Amount per unit*"
          ethValue={ethValue}
          setEthValue={setEthValue}
          usdValue={usdValue}
          setUsdValue={setUsdValue}
          required
        />
        <p className="text-sm text-left text-gray-600">
          Total price (incl. standard price):{" "}
          <b>
            Ξ{" "}
            {Math.round((Number(ethProductPrice) + Number(ethValue)) * 1000) /
              1000}
          </b>
        </p>
      </div>
    </>
  )
}

const hook: Hook = { label, description, Component }

export default hook
