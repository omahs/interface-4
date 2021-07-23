import { initialize } from "@lib/useProvider"
import { slice } from "@lib/initProvider"

const TriggerRelease = async (
  account: string,
  slicerAddresses: string[],
  slicerPercentage: number
) => {
  const { signer } = await initialize()
  const sliceContract = slice(signer)

  const data = await sliceContract.triggerRelease(
    account,
    slicerAddresses,
    slicerPercentage
  )

  return data
}

export default TriggerRelease
