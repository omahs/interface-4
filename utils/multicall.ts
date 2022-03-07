import { defaultProvider } from "@lib/useProvider"
import getSelector from "./getSelector"

const multicall = async (
  to: string,
  functionSignature: string,
  args: string[]
) => {
  const promises = []
  const selector = getSelector(functionSignature)

  args.forEach((arg) => {
    const data = selector + arg
    promises.push(
      defaultProvider.call({
        to,
        data,
      })
    )
  })

  const results = await Promise.all(promises)
  return results
}

export default multicall
