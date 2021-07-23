import { initialize } from "@lib/useProvider"
import { slicer } from "@lib/initProvider"

const TriggerSingleRelease = async (slicerId: number, account?: string) => {
  const { signer } = await initialize()
  const slicerContract = await slicer(slicerId, signer)

  const data = await slicerContract.release(account)

  return data
}

export default TriggerSingleRelease
