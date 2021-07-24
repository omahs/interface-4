import { initialize } from "@lib/useProvider"
import { slice } from "@lib/initProvider"

const TriggerRelease = async (
  account: string,
  slicerAddresses: string[],
  slicerPercentage: number
) => {
  const { signer } = await initialize()
  const contract = slice(signer)

  try {
    const call = await contract.triggerRelease(
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
