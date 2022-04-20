import getSelector from "@utils/getSelector"
import { BigNumber, ethers } from "ethers"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { MerkleTree } from "merkletreejs"
import keccak256 from "keccak256"
import { FunctionStruct } from "types/typechain/ProductsModule"
import { Input, InputPrice, InputSwitch, InputAddress } from "../"
import Textarea from "../Textarea"

type Props = {
  allowedAddresses: string[]
  setExternalCall: Dispatch<SetStateAction<FunctionStruct>>
  setAllowedAddresses: Dispatch<SetStateAction<string[]>>
}

const AddProductFormExternal = ({
  allowedAddresses,
  setExternalCall,
  setAllowedAddresses
}: Props) => {
  const [data, setData] = useState([])
  const [address, setAddress] = useState("")
  const [resolvedAddress, setResolvedAddress] = useState("")
  const [checkFunctionSignature, setCheckFunctionSignature] = useState("")
  const [execFunctionSignature, setExecFunctionSignature] = useState("")
  const [allowedAddressesString, setAllowedAddressesString] = useState("")
  const [isContractCall, setIsContractCall] = useState(false)
  const [isAllowlist, setIsAllowlist] = useState(false)
  const [isPayable, setIsPayable] = useState(false)
  const [usdValue, setUsdValue] = useState(0)
  const [ethValue, setEthValue] = useState(0)
  const [copiedRoot, setCopiedRoot] = useState(false)

  const execSelector = execFunctionSignature
    ? getSelector(execFunctionSignature)
    : "0x00000000"
  const checkSelector = checkFunctionSignature
    ? getSelector(checkFunctionSignature)
    : "0x00000000"

  const copyRoot = async () => {
    const leafNodes = allowedAddresses.map((addr) => keccak256(addr))
    const tree = new MerkleTree(leafNodes, keccak256, {
      sortPairs: true
    })
    const hexRoot = tree.getHexRoot()

    await navigator.clipboard.writeText(hexRoot)
    setCopiedRoot(true)
    setTimeout(() => {
      setCopiedRoot(false)
    }, 2000)
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
    setExternalCall({
      data,
      value: ethToWei,
      externalAddress,
      checkFunctionSignature: checkSelector,
      execFunctionSignature: execSelector
    })
  }, [
    data,
    ethValue,
    usdValue,
    address,
    resolvedAddress,
    checkSelector,
    execSelector
  ])

  useEffect(() => {
    if (isContractCall) {
      setCheckFunctionSignature(
        "isPurchaseAllowed(uint256,uint256,address,uint256,bytes,bytes)"
      )
      setExecFunctionSignature("onProductPurchase(bytes)")
    } else {
      setCheckFunctionSignature("")
      setExecFunctionSignature("")
      setAllowedAddresses([])
    }
  }, [isContractCall])

  useEffect(() => {
    if (!isPayable) {
      setEthValue(0)
      setUsdValue(0)
    }
  }, [isPayable])

  useEffect(() => {
    if (isContractCall) {
      const formattedAddresses = allowedAddressesString
        .toLowerCase()
        .replaceAll(/\s/g, "")
        .split(",")
        .filter((address) => address != "")
      setAllowedAddresses(formattedAddresses)
    }
  }, [isContractCall, allowedAddressesString])

  return (
    <>
      <h2 className="pb-6">External call</h2>
      <p className="pb-3">
        Send ETH to an external address or execute logic on a smart contract
        upon each purchase.
      </p>
      <div>
        <InputAddress
          label="External address"
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
          setEnabled={setIsPayable}
        />
      </div>
      {isPayable ? (
        <div className="pb-3">
          <InputPrice
            ethValue={ethValue}
            setEthValue={setEthValue}
            usdValue={usdValue}
            setUsdValue={setUsdValue}
            label="Value per unit"
          />
        </div>
      ) : null}
      <div>
        <InputSwitch
          label="Execute contract logic"
          enabled={isContractCall}
          setEnabled={setIsContractCall}
        />
      </div>
      {isContractCall ? (
        <>
          <p className="pb-3 text-yellow-600">
            <b>
              This section is for advanced users. Enable it only if you know
              what you&apos;re doing
            </b>
          </p>
          <div className="relative">
            <Input
              label="Function signature (exec)"
              type="string"
              placeholder="onProductPurchase(bytes)"
              value={execFunctionSignature}
              onChange={setExecFunctionSignature}
              question={
                <>
                  <p>
                    The signature of the function that will be executed upon
                    purchase, on the specified external address.
                  </p>
                </>
              }
            />
            <p className="text-blue-600 dark:text-sky-300 absolute text-xs opacity-80 font-black left-0 bottom-[-23px]">
              {execSelector}
            </p>
          </div>
          <div className="relative pt-3">
            <Input
              label="Function signature (check)"
              type="string"
              placeholder="isPurchaseAllowed(uint256,uint256,address,uint256,bytes,bytes)"
              value={checkFunctionSignature}
              onChange={setCheckFunctionSignature}
              question={
                <>
                  <p>
                    The signature of the function that checks if a buyer is
                    eligible for purchase.{" "}
                  </p>
                  <p>
                    Called to enable purchases for a buyer on the slicer store
                    on Slice website. Returns true if buyer is allowed.
                  </p>
                </>
              }
            />
            <p className="text-blue-600 dark:text-sky-300 absolute text-xs opacity-80 font-black left-0 bottom-[-23px]">
              {checkSelector}
            </p>
          </div>
          <div className="pt-3">
            <InputSwitch
              label="Allowlist"
              enabled={isAllowlist}
              setEnabled={setIsAllowlist}
            />
          </div>
          {isAllowlist && (
            <div className="relative space-y-3">
              <p>
                Specify the addresses that will be able to buy the product,
                checked using merkle proof verification.{" "}
              </p>
              <p>
                <b className="text-yellow-600">
                  Note that the logic to handle the allowlist needs to be
                  included in the external smart contract.
                </b>
              </p>
              <div className="pt-4">
                <Textarea
                  label="Addresses list (no ENS)"
                  placeholder="Add addresses separated by comma"
                  value={allowedAddressesString}
                  onChange={setAllowedAddressesString}
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
      ) : null}
      {/* {externalCall.externalAddress &&
      externalCall.externalAddress != ethers.constants.AddressZero &&
      !isPayable &&
      !isContractCall ? (
        <p className="pt-3 text-yellow-600">
          <b>Either enable sending ETH or executing contract logic.</b>
        </p>
      ) : null} */}
      {ethValue != 0 ? (
        <p className="text-yellow-600">
          <b>The sent value will be added to the unit product price.</b>
        </p>
      ) : null}
      <div>
        <hr className="w-20 mx-auto border-gray-300 my-14" />
      </div>
    </>
  )
}

export default AddProductFormExternal
