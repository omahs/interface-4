import { sliceCore } from "@lib/initProvider"

const getSlicerAddresses = async (slicerIds: number[], signer: any) => {
  const sliceCorecontract = sliceCore(signer)
  let slicerAddresses = []

  slicerIds.forEach(async (slicerId) => {
    const slicerAddress = await sliceCorecontract.slicers(slicerId)
    slicerAddresses.push(slicerAddress)
  })

  return slicerAddresses
}

export default getSlicerAddresses
