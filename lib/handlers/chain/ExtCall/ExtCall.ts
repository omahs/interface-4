import WalletConnect from "@walletconnect/client"
import { BytesLike, utils } from "ethers"

const ExtCall = async (
  connector: WalletConnect,
  to: string,
  selector: string,
  slicerId: number,
  productId: number,
  account: string,
  quantity: number,
  extData: BytesLike,
  buyerCustomData: BytesLike
) => {
  const { initialize } = await import("@lib/useProvider")
  const { provider } = await initialize(connector)
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

// 0x96DDA286a261f620aa410524BfB9558e84A25F29
