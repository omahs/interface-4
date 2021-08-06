import { defaultProvider } from "@lib/useProvider"
import { slicer } from "@lib/initProvider"

const TotalReceived = async (id: number) => {
  const contract = await slicer(Number(id), defaultProvider)

  try {
    const call = await contract.totalReceived()
    return [contract, call]
  } catch (err) {
    throw err
  }
}

export default TotalReceived
