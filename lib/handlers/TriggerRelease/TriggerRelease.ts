import { initialize } from "@lib/useProvider"
import { slice } from "@lib/initProvider"
import getSlicerAddresses from "@utils/getSlicerAddresses"

const TriggerRelease = async (
  slicerIds: number[],
  slicerPercentage: number,
  account?: string
) => {
  const { signer } = await initialize()
  const slicecontract = slice(signer)
  const slicerAddresses = getSlicerAddresses(slicerIds, signer)

  const data = await slicecontract.triggerRelease(
    account,
    slicerAddresses,
    slicerPercentage
  )

  return data
}

export default TriggerRelease
