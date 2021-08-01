import { sliceCore } from "@lib/initProvider"
import { defaultProvider } from "@lib/useProvider"

const getSlicerAddresses = async (slicerIds: number[]) => {
  const sliceCorecontract = sliceCore(defaultProvider)
  let slicerAddresses = []

  slicerIds.forEach(async (slicerId) => {
    const slicerAddress = await sliceCorecontract.slicers(slicerId)
    slicerAddresses.push(slicerAddress)
  })

  return slicerAddresses
}

export default getSlicerAddresses
