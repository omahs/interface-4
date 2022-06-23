import { Dispatch, SetStateAction } from "react"
import { View } from "@lib/content/modals"
import { Signer } from "ethers"

const handleRedeemProduct = async (
  signer: Signer,
  slicerId: number,
  productId: number,
  name: string,
  image: string,
  uid: string,
  creator: string,
  texts: {
    thanks?: string
    instructions?: string
  },
  setLoading: Dispatch<SetStateAction<boolean>>,
  setModalView: Dispatch<SetStateAction<View>>
) => {
  try {
    sa_event("redeem_product_attempt")
    const { CID } = await import("multiformats/cid")
    const { base16 } = await import("multiformats/bases/base16")
    const redeemProduct = (await import("@lib/handlers/chain/redeemProduct"))
      .default
    const handleDecryptData = (await import("@lib/handleDecryptData")).default

    let decryptedFiles: File[] = []
    let decryptedTexts: {} = {}

    setLoading(true)

    const redeemed = await redeemProduct(signer, slicerId, productId)

    if (redeemed[1] != "0x") {
      const purchaseHash = CID.parse(
        "f" + redeemed[1].substring(2),
        base16.decoder
      )
        .toV1()
        .toString()
      const decrypted = await handleDecryptData(
        slicerId,
        name,
        creator,
        uid,
        purchaseHash
      )
      decryptedFiles = decrypted.decryptedFiles
      decryptedTexts = decrypted.decryptedTexts
    }
    setModalView({
      name: "REDEEM_PRODUCT_VIEW",
      cross: true,
      params: {
        slicerId,
        productId,
        name,
        image,
        purchasedQuantity: Number(redeemed[0]),
        texts,
        decryptedFiles,
        decryptedTexts
      }
    })
  } catch (err) {
    sa_event("redeem_product_fail")
    console.log(err)
  }
  setLoading(false)
}

export default handleRedeemProduct
