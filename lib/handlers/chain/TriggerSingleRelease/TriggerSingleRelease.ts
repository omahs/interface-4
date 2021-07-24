import { initialize } from "@lib/useProvider"
import { slicer } from "@lib/initProvider"

const TriggerSingleRelease = async (slicerId: number, account?: string) => {
  const { signer } = await initialize()
  const contract = await slicer(slicerId, signer)

  try {
    const call = await contract.release(account)
    return [contract, call]
  } catch (err) {
    throw err
  }
}

export default TriggerSingleRelease
