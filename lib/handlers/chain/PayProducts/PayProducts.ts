import { BigNumber } from "ethers"
import { initialize } from "@lib/useProvider"
import { slice, sliceCore } from "@lib/initProvider"
import { GetProductPrice } from ".."

const PayProducts = async (
  slicerIds: number[],
  productIds: number[],
  quantities: number[]
) => {
  const { signer } = await initialize()
  const contract = slice(signer)
  const sliceCorecontract = sliceCore(signer)
  let slicerAddresses: string[]
  let totalPrice: BigNumber

  try {
    slicerIds.forEach(async (slicerId, i) => {
      const slicerAddress = await sliceCorecontract.slicers(slicerId)
      slicerAddresses.push(slicerAddress)
      const productPrice = await GetProductPrice(
        slicerId,
        productIds[i],
        quantities[i]
      )
      totalPrice.add(Number(productPrice))
    })

    const call = await contract.payProducts(
      slicerAddresses,
      productIds,
      quantities,
      {
        value: totalPrice,
      }
    )
    return [contract, call]
  } catch (err) {
    throw err
  }
}

export default PayProducts
