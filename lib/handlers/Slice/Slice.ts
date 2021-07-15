import { initialize } from "@lib/useProvider"
import { slice } from "@lib/initProvider"

const Slice = async (
  accounts: string[],
  shares: number[],
  minimumShares: number
) => {
  const { signer } = await initialize()
  const slicecontract = slice(signer)

  const data = await slicecontract.slice(accounts, shares, minimumShares)
  // slicecontract.once(
  //   "TokenSliced",
  //   (
  //     slicerAddress: string,
  //     tokenId: number,
  //     payees: string[],
  //     shares: number[]
  //   ) => {
  //     let e = []
  //     shares.forEach((el) => {
  //       e.push(Number(el))
  //     })
  //     console.log(slicerAddress, tokenId, payees, e)
  //   }
  // )

  return data
}

export default Slice
