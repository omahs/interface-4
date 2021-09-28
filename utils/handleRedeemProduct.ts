import WalletConnect from "@walletconnect/client"
import { View } from "@lib/text/modals"
import { Dispatch, SetStateAction } from "react"
import { CID } from "multiformats/cid"
import { base16 } from "multiformats/bases/base16"
import redeemProduct from "@lib/handlers/chain/redeemProduct"
import handleDecryptData from "@lib/handleDecryptData"

const handleRedeemProduct = async (
  connector: WalletConnect,
  slicerId: number,
  productId: number,
  name: string,
  image: string,
  uid: string,
  creator: string,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setModalView: Dispatch<SetStateAction<View>>
) => {
  setLoading(true)
  const redeemed = await redeemProduct(connector, slicerId, productId)
  const purchaseHash = CID.parse("f" + redeemed[1].substring(2), base16.decoder)
    .toV1()
    .toString()
  const { decryptedFiles, decryptedTexts } = await handleDecryptData(
    slicerId,
    name,
    creator,
    uid,
    purchaseHash
  )

  setModalView({
    name: "REDEEM_PRODUCT_VIEW",
    cross: true,
    params: {
      slicerId,
      productId,
      name,
      image,
      purchasedQuantity: Number(redeemed[0]),
      decryptedFiles,
      decryptedTexts,
    },
  })
  setLoading(false)
}

export default handleRedeemProduct
