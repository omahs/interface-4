import { StrategyParams } from "@components/priceStrategies/strategies"
import ethToWei from "@utils/ethToWei"
import { formatNumberWithUnit } from "@utils/formatNumber"
import { ethers } from "ethers"
import { useState } from "react"
import AddProductFormAvailability from "../AddProductFormAvailability"
import AddProductFormPrice from "../AddProductFormPrice"
import Button from "../Button"

type Props = {
  maxUnits: number
  isInfinite: boolean
  availableUnits: number
  productPrice: {
    eth: string
    usd: string
  }
  isUSD: boolean
  extAddress: string
}

const EditProductForm = ({
  maxUnits,
  isInfinite,
  availableUnits,
  productPrice,
  isUSD,
  extAddress
}: Props) => {
  const [newIsMultiple, setNewIsMultiple] = useState(
    maxUnits == 1 ? false : true
  )

  const [newIsLimited, setNewIsLimited] = useState(!isInfinite)
  const [newUnits, setNewUnits] = useState(availableUnits)
  const [newMaxUnits, setNewMaxUnits] = useState(maxUnits)
  const [newUsdValue, setNewUsdValue] = useState(
    formatNumberWithUnit(productPrice.usd)
  )
  const [newEthValue, setNewEthValue] = useState(
    formatNumberWithUnit(productPrice.eth)
  )
  const [newIsUSD, setNewIsUSD] = useState(isUSD)
  const [newPriceParams, setNewPriceParams] = useState<StrategyParams>(
    extAddress &&
      extAddress != "0x00000000" &&
      extAddress != ethers.constants.AddressZero
      ? { address: extAddress }
      : null
  )
  const isFree = newPriceParams?.address
    ? false
    : newEthValue != 0
    ? false
    : true
  const weiValue = ethToWei(newEthValue)
  const newProductPrice = newIsUSD ? Math.floor(newUsdValue * 1e6) : weiValue
  const isStrategyConfigurable = newPriceParams?.abi != undefined
  // const currencyPrices =
  //   Number(newProductPrice) != 0 || newPriceParams?.address
  //     ? [
  //         {
  //           currency: ethers.constants.AddressZero,
  //           value: newProductPrice,
  //           dynamicPricing: newIsUSD,
  //           externalAddress:
  //             newPriceParams?.address || ethers.constants.AddressZero
  //         }
  //       ]
  //     : []

  console.log({ isFree, newProductPrice, isStrategyConfigurable })

  const submit = async (e: React.SyntheticEvent<EventTarget>) => {}

  return (
    <form className="w-full mx-auto space-y-6 text-left" onSubmit={submit}>
      <AddProductFormAvailability
        isMultiple={newIsMultiple}
        isLimited={newIsLimited}
        units={newUnits}
        maxUnits={newMaxUnits}
        setIsMultiple={setNewIsMultiple}
        setIsLimited={setNewIsLimited}
        setUnits={setNewUnits}
        setMaxUnits={setNewMaxUnits}
      />
      <AddProductFormPrice
        isFree={isFree}
        ethValue={newEthValue}
        usdValue={newUsdValue}
        isUSD={newIsUSD}
        setEthValue={setNewEthValue}
        setUsdValue={setNewUsdValue}
        setIsUSD={setNewIsUSD}
        units={newUnits}
        setPriceParams={setNewPriceParams}
      />
      <Button label="update" type="submit" />
    </form>
  )
}

export default EditProductForm
