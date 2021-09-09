import { BigNumber } from "ethers"
import { initialize } from "@lib/useProvider"
import { slicer } from "@lib/initProvider"

const AddProduct = async (
  slicerId: number,
  categoryIndex: number,
  price: number,
  isUSD: boolean,
  isMultiple: boolean,
  isInfinite: boolean,
  units: number,
  data: string | object = [],
  purchaseData: string | object = [],
  subSlicersIds = [],
  subProducts = []
) => {
  const { signer } = await initialize()
  const contract = await slicer(slicerId, signer)
  const decimals = BigNumber.from(10).pow(18)
  const ethToWei = BigNumber.from(price).mul(decimals)
  const productPrice = isUSD ? price : ethToWei

  try {
    console.log("trying")
    const call = await contract.addProduct(
      categoryIndex,
      productPrice,
      isUSD,
      isMultiple,
      isInfinite,
      units,
      data,
      purchaseData,
      subSlicersIds,
      subProducts
    )
    return [contract, call]
  } catch (err) {
    console.log(err)
    throw err
  }
}

export default AddProduct
