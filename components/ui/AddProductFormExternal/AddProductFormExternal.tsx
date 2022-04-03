import getSelector from "@utils/getSelector"
import { BigNumber, ethers } from "ethers"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { FunctionStruct } from "types/typechain/ProductsModule"
import { Input, InputPrice, InputSwitch, InputAddress } from "../"
import { useEns } from "@utils/resolveEns"
import { useAppContext } from "../context"

type Props = {
  externalCall: FunctionStruct
  setExternalCall: Dispatch<SetStateAction<FunctionStruct>>
}

const AddProductFormExternal = ({ externalCall, setExternalCall }: Props) => {
  const { connector } = useAppContext()
  const [data, setData] = useState([])
  const [address, setAddress] = useState("")
  const [checkFunctionSignature, setCheckFunctionSignature] = useState("")
  const [execFunctionSignature, setExecFunctionSignature] = useState("")
  const [isContractCall, setIsContractCall] = useState(false)
  const [isPayable, setIsPayable] = useState(false)
  const [usdValue, setUsdValue] = useState(0)
  const [ethValue, setEthValue] = useState(0)
  const resolvedAddress = useEns(connector, address)

  const execSelector = execFunctionSignature
    ? getSelector(execFunctionSignature)
    : "0x00000000"
  const checkSelector = checkFunctionSignature
    ? getSelector(checkFunctionSignature)
    : "0x00000000"

  useEffect(() => {
    const externalAddress =
      address && resolvedAddress
        ? address.substring(address.length - 4) === ".eth"
          ? resolvedAddress
          : address
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
        "isPurchaseAllowed(uint256,uint32,address,uint256,bytes)"
      )
      setExecFunctionSignature("onProductPurchase(bytes)")
    } else {
      setCheckFunctionSignature("")
      setExecFunctionSignature("")
    }
  }, [isContractCall])

  useEffect(() => {
    if (!isPayable) {
      setEthValue(0)
      setUsdValue(0)
    }
  }, [isPayable])

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
              placeholder="isPurchaseAllowed(uint256,uint32,address,uint256,bytes)"
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
                    on Slice website.
                  </p>
                </>
              }
            />
            <p className="text-blue-600 dark:text-sky-300 absolute text-xs opacity-80 font-black left-0 bottom-[-23px]">
              {checkSelector}
            </p>
          </div>
        </>
      ) : null}
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
