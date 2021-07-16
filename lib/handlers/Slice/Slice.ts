import { slice } from "@lib/initProvider"
import { initialize } from "@lib/useProvider"
import handleLog from "@utils/handleLog"

const Slice = async (
  accounts: string[],
  shares: number[],
  minimumShares: number
) => {
  const { signer } = await initialize()
  const slicecontract = slice(signer)

  try {
    const call = await slicecontract.slice(accounts, shares, minimumShares)
    const eventLog = await handleLog(slicecontract, call)
    console.log(eventLog)
    return eventLog
  } catch (err) {
    throw err
  }
}

export default Slice
