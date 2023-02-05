import getSelector from "@utils/getSelector"
import { BigNumber, ethers } from "ethers"
import React, { useEffect, useState } from "react"
import {
  Input,
  InputPrice,
  InputSwitch,
  InputAddress,
  Textarea
} from "@components/ui"
import { Hook, HookProps } from "../purchaseHooks"
import timeout from "@utils/timeout"
import calculateRoot from "@utils/calculateRoot"
import useEthUsd from "@utils/useEthUsd"

type Props = HookProps & { ethProductPrice: number }

const label = "Existing hook"

const description = (
  <>
    Send ETH and/or execute on-chain logic on an existing hook inheriting{" "}
    <a
      className="font-bold highlight"
      href="https://github.com/slice-so/contracts-purchasable-template/blob/master/contracts/extensions/Purchasable/SlicerPurchasable.sol"
      target="_blank"
      rel="noreferrer"
    >
      SlicerPurchasable
    </a>
    .
  </>
)

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
  const initData = params?.externalCall?.data || []
  const initCheckSignature = params?.fields?.checkFunctionSignature || ""
  const initExecSignature = params?.fields?.execFunctionSignature || ""
  const initAllowedAddresses = params?.allowedAddresses?.join(", ") || ""

  const [allowedAddresses, setAllowedAddresses] = useState(
    params?.allowedAddresses || []
  )

  const [data, setData] = useState(initData)
  const [address, setAddress] = useState(initAddress)
  const [resolvedAddress, setResolvedAddress] = useState("")
  const [checkFunctionSignature, setCheckFunctionSignature] =
    useState(initCheckSignature)
  const [execFunctionSignature, setExecFunctionSignature] =
    useState(initExecSignature)
  const [allowedAddressesText, setAllowedAddressesText] =
    useState(initAllowedAddresses)
  const [isContractCall, setIsContractCall] = useState(
    initCheckSignature != "" || initExecSignature != ""
  )
  const [isAllowlist, setIsAllowlist] = useState(
    Boolean(params?.allowedAddresses && params?.allowedAddresses.length != 0)
  )
  const [isPayable, setIsPayable] = useState(Boolean(initValue) || false)
  const [usdValue, setUsdValue] = useState(initValue * ethUsd)
  const [ethValue, setEthValue] = useState(initValue)
  const [copiedRoot, setCopiedRoot] = useState(false)

  const signatureParams = "(uint256,uint256,address,uint256,bytes,bytes)"
  const execSelector = execFunctionSignature
    ? getSelector(execFunctionSignature.trim() + signatureParams)
    : "0x00000000"
  const checkSelector = checkFunctionSignature
    ? getSelector(checkFunctionSignature.trim() + signatureParams)
    : "0x00000000"

  const copyRoot = async () => {
    const hexRoot = calculateRoot(allowedAddresses)
    await navigator.clipboard.writeText(hexRoot)
    setCopiedRoot(true)
    await timeout(2000)
    setCopiedRoot(false)
  }

  const handleSetIsPayable = (value: boolean) => {
    setIsPayable(value)
    if (!value) {
      setEthValue(0)
      setUsdValue(0)
    }
  }

  const handleSetIsContractCall = (value: boolean) => {
    setIsContractCall(value)
    if (value) {
      setCheckFunctionSignature("isPurchaseAllowed")
      setExecFunctionSignature("onProductPurchase")
    } else {
      setCheckFunctionSignature("")
      setExecFunctionSignature("")
      setIsAllowlist(false)
      setAllowedAddressesText("")
      setAllowedAddresses([])
    }
  }

  const handleSetIsAllowlist = (value: boolean) => {
    setIsAllowlist(value)
    if (!value) {
      setAllowedAddressesText("")
      setAllowedAddresses([])
    }
  }

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
      allowedAddresses,
      externalCall: {
        data,
        value: ethToWei,
        externalAddress,
        checkFunctionSignature: checkSelector,
        execFunctionSignature: execSelector
      },
      fields: {
        checkFunctionSignature,
        execFunctionSignature
      }
    })
  }, [
    data,
    ethValue,
    usdValue,
    address,
    resolvedAddress,
    checkSelector,
    execSelector,
    allowedAddresses
  ])

  useEffect(() => {
    if (isContractCall) {
      const formattedAddresses = allowedAddressesText
        .toLowerCase()
        .replaceAll(/\s/g, "")
        .split(",")
        .filter((address) => address != "")
      setAllowedAddresses(formattedAddresses)
    }
  }, [isContractCall, allowedAddressesText])

  return (
    <>
      <div>
        <InputAddress
          label="External address"
          placeholder="0x…"
          address={address}
          onChange={setAddress}
          required={isPayable || isContractCall}
          resolvedAddress={resolvedAddress}
          setResolvedAddress={setResolvedAddress}
        />
      </div>
      <div className="pt-3">
        <InputSwitch
          label="Send ETH"
          enabled={isPayable}
          setEnabled={handleSetIsPayable}
        />
      </div>
      {isPayable && (
        <>
          <div className="pb-3">
            <InputPrice
              ethValue={ethValue}
              setEthValue={setEthValue}
              usdValue={usdValue}
              setUsdValue={setUsdValue}
              label="Amount per unit"
            />
            <p className="text-sm font-medium text-left text-gray-600">
              Total price (incl. standard price): Ξ{" "}
              {Math.round((Number(ethProductPrice) + Number(ethValue)) * 1000) /
                1000}
            </p>
          </div>
        </>
      )}
      <div>
        <InputSwitch
          label="Execute contract logic"
          enabled={isContractCall}
          setEnabled={handleSetIsContractCall}
        />
      </div>
      {isContractCall && (
        <>
          <div className="relative">
            <Input
              label="Function signature (check)"
              type="string"
              placeholder="isPurchaseAllowed"
              className="mt-4"
              value={checkFunctionSignature}
              onChange={setCheckFunctionSignature}
              question={
                <>
                  <p>
                    The signature of the function that checks if a buyer is
                    eligible for purchase. See{" "}
                    <a
                      href="https://github.com/slice-so/genesis-nft/blob/main/contracts/extensions/Purchasable/SlicerPurchasable.sol"
                      target="_blank"
                      rel="noreferrer"
                    >
                      example
                    </a>
                    .
                  </p>
                  <p>
                    Called to enable purchases for a buyer on the slicer store
                    on Slice website. Returns true if buyer is allowed.
                  </p>
                  <p>
                    Leave blank if there are no checks to be performed from the
                    Slice interface (the product won&apos;t appear locked)
                  </p>
                </>
              }
            />
            <p className="text-blue-600 dark:text-sky-300 absolute text-xs opacity-80 font-black left-0 bottom-[-23px]">
              {checkSelector}
            </p>
            <p className="absolute text-xs opacity-50 left-0 top-[36px]">
              {signatureParams}
            </p>
          </div>
          <div className="relative pt-4">
            <Input
              label="Function signature (on purchase)"
              type="string"
              placeholder="onProductPurchase"
              className="mt-4"
              value={execFunctionSignature}
              onChange={setExecFunctionSignature}
              question={
                <>
                  <p>
                    The signature of the function that will be executed upon
                    purchase, on the specified external address. See{" "}
                    <a
                      href="https://github.com/slice-so/genesis-nft/blob/main/contracts/extensions/Purchasable/SlicerPurchasable.sol"
                      target="_blank"
                      rel="noreferrer"
                    >
                      example
                    </a>
                    .
                  </p>
                </>
              }
            />
            <p className="text-blue-600 dark:text-sky-300 absolute text-xs opacity-80 font-black left-0 bottom-[-23px]">
              {execSelector}
            </p>
            <p className="absolute text-xs opacity-50 left-0 top-[52px]">
              {signatureParams}
            </p>
          </div>
          <div className="pt-3">
            <InputSwitch
              label="Allowlist"
              enabled={isAllowlist}
              setEnabled={handleSetIsAllowlist}
            />
          </div>
          {isAllowlist && (
            <div className="relative space-y-3">
              <p>
                Specify the addresses that will be able to buy the product,
                checked using merkle proof verification.{" "}
              </p>
              <div className="pt-4">
                <Textarea
                  label="Addresses list (no ENS)"
                  placeholder="Add addresses separated by comma"
                  value={allowedAddressesText}
                  onChange={setAllowedAddressesText}
                  markdownView={false}
                />
              </div>
              <p className="text-blue-600 dark:text-sky-300 absolute text-xs opacity-80 font-black left-0 bottom-[-23px]">
                Total: {allowedAddresses.length}
              </p>
              {allowedAddresses.length != 0 && (
                <p
                  className={`absolute text-xs opacity-80 font-black right-0 bottom-[-23px] ${
                    copiedRoot
                      ? "text-green-600 cursor-default"
                      : "hover:text-blue-600 dark:hover:text-sky-300 cursor-pointer"
                  }`}
                  onClick={async () => !copiedRoot && (await copyRoot())}
                >
                  {copiedRoot ? "Merkle root copied!" : "Copy Merkle root"}
                </p>
              )}
            </div>
          )}
        </>
      )}
    </>
  )
}

const hook: Hook = { label, description, Component }

export default hook
