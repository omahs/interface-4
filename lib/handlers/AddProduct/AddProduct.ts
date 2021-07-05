import { BigNumber } from "ethers"
import { initialize } from "@lib/useProvider"
import { slicer } from "@lib/initProvider"

const AddProduct = async (
  slicerId: number,
  categoryIndex: number,
  priceInEth: number,
  isUSD: boolean,
  isMultiple: boolean,
  units: number
  // bytes memory data,
  // bytes memory purchaseData
) => {
  const { signer } = await initialize()
  const slicerContract = await slicer(slicerId, signer)

  const decimals = BigNumber.from(10).pow(18)
  const amountBN = BigNumber.from(priceInEth).mul(decimals)
  const data = await slicerContract.addProduct(
    categoryIndex,
    amountBN,
    isUSD,
    isMultiple,
    units,
    [],
    []
  )

  return data
}

export default AddProduct
