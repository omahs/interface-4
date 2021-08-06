import { initialize } from "@lib/useProvider"
import { slice } from "@lib/initProvider"

const getEthUsd = async () => {
  const { signer } = await initialize()
  const contract = slice(signer)

  try {
    const call = await contract.getEthUsd()
    // const ethUsd = Number(call) / 10 ** 8
    return [contract, call]
  } catch (err) {
    throw err
  }
}

export default getEthUsd
