import { initialize } from "@lib/useProvider"
import { slc } from "@lib/initProvider"

const GetSlcBalance = async () => {
  const { signer, signerAddress } = await initialize()
  const slccontract = slc(signer)

  const data = await slccontract.balanceOf(signerAddress)

  return data
}

export default GetSlcBalance
