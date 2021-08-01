import { initialize } from "@lib/useProvider"
import { slc } from "@lib/initProvider"

const GetSlcBalance = async () => {
  const { signer, signerAddress } = await initialize()
  const contract = slc(signer)

  try {
    const call = await contract.balanceOf(signerAddress)
    return [contract, call]
  } catch (err) {
    throw err
  }
}

export default GetSlcBalance
