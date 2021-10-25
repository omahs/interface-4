const getSlicerAddresses = async (slicerIds: number[]) => {
  const { sliceCore } = await import("@lib/initProvider")
  const { defaultProvider } = await import("@lib/useProvider")

  const sliceCorecontract = sliceCore(defaultProvider)
  let slicerAddresses = []

  slicerIds.forEach(async (slicerId) => {
    const slicerAddress = await sliceCorecontract.slicers(slicerId)
    slicerAddresses.push(slicerAddress)
  })

  return slicerAddresses
}

export default getSlicerAddresses
