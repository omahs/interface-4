import { ethers } from "ethers"

const getSlicerAddresses = async (
  provider: ethers.providers.BaseProvider,
  slicerIds: number[]
) => {
  const { sliceCore } = await import("@lib/initProvider")

  const sliceCorecontract = sliceCore(provider)
  let slicerAddresses = []

  slicerIds.forEach(async (slicerId) => {
    const slicerAddress = await sliceCorecontract.slicers(slicerId)
    slicerAddresses.push(slicerAddress)
  })

  return slicerAddresses
}

export default getSlicerAddresses
