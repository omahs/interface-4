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
  const slicecontract = slice(signer)
  const sliceCorecontract = sliceCore(signer)
  let slicerAddresses: string[]
  let totalPrice: BigNumber

  slicerIds.forEach(async (slicerId, i) => {
    const slicerAddress = await sliceCorecontract.slicers(slicerId)
    slicerAddresses.push(slicerAddress)
    totalPrice.add(
      await GetProductPrice(slicerId, productIds[i], quantities[i])
    )
  })

  const data = await slicecontract.payProducts(
    slicerAddresses,
    productIds,
    quantities,
    {
      value: totalPrice,
    }
  )

  return data
}

export default PayProducts
