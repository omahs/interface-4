import { initialize } from "@lib/useProvider"
import { slice, slc } from "@lib/initProvider"

const TriggerRelease = async (
  account: string,
  slicerAddresses: string[],
  slicerPercentage: number
) => {
  const { signer } = await initialize()
  const contract = slc(signer)
  const sliceContract = slice(signer)

  try {
    const call = await sliceContract.triggerRelease(
      account,
      slicerAddresses,
      slicerPercentage
    )
    return [contract, call]
  } catch (err) {
    throw err
  }
}

export default TriggerRelease
