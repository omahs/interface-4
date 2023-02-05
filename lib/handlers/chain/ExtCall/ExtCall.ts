import { Provider } from "@ethersproject/providers"
import { BytesLike, utils } from "ethers"

const ExtCall = async (
  provider: Provider,
  to: string,
  selector: string,
  slicerId: number,
  productId: number,
  account: string,
  quantity: number,
  extData: BytesLike,
  buyerCustomData: BytesLike
) => {
  const customData = utils.defaultAbiCoder.encode(
    ["uint256", "uint256", "address", "uint256", "bytes", "bytes"],
    [slicerId, productId, account, quantity, extData, buyerCustomData]
  )
  const data = selector + customData.substring(2)
  try {
    const call = await provider.call({
      to,
      data
    })
    return call
  } catch (err) {
    throw err
  }
}

export default ExtCall
