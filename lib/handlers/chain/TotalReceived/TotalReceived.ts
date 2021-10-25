const TotalReceived = async (id: number) => {
  const { defaultProvider } = await import("@lib/useProvider")
  const { slicer } = await import("@lib/initProvider")

  const contract = await slicer(Number(id), defaultProvider)

  try {
    const call = await contract.totalReceived()
    return [contract, call]
  } catch (err) {
    throw err
  }
}

export default TotalReceived
