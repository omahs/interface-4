import { CID } from "multiformats/cid"
import { base16 } from "multiformats/bases/base16"
import redeemProduct from "@lib/handlers/chain/redeemProduct"
import { useState } from "react"
import { Button, CardImage } from ".."
import { useAppContext } from "../context"
import handleDecryptData from "@lib/handleDecryptData"

export type RedeemData = {
  quantity: number
  purchaseHash: string
}

type Props = {
  slicerId: number
  productId: number
  name: string
  hash: string
  image: string
  uid: string
  creator: string
  purchaseInfo: string
}

const ProductPurchaseCard = ({
  slicerId,
  productId,
  name,
  hash,
  image,
  uid,
  creator,
  purchaseInfo,
}: Props) => {
  const { setModalView } = useAppContext()
  const [loading, setLoading] = useState(false)
  const [redeemData, setRedeemData] = useState<RedeemData>(null)

  const handleRedeemProduct = async () => {
    setLoading(true)
    const redeemed = await redeemProduct(slicerId, productId)
    const purchaseHash = CID.parse(
      "f" + redeemed[1].substring(2),
      base16.decoder
    )
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

  return (
    <div className="sm:flex">
      <CardImage
        href={`/slicer/${slicerId}`}
        name={name}
        imageUrl={image}
        product={true}
      />
      <div className="pt-5 sm:pt-4 sm:ml-6 md:ml-14">
        <div className="flex items-center">
          {name ? (
            <h3 className="inline-block">{name}</h3>
          ) : (
            <div className="w-32 h-6 mb-2 rounded-md bg-sky-300 animate-pulse" />
          )}
          {name && (
            <p className="h-full ml-3 text-sm font-normal text-gray-500">
              {slicerId} / #{productId}
            </p>
          )}
        </div>
        <div className="text-gray-700">
          <p className="text-sm">
            Contains <b>{purchaseInfo || "..."}</b>
          </p>
        </div>
        <div className="mt-4">
          <Button
            label="Redeem"
            loading={loading}
            onClick={() => handleRedeemProduct()}
          />
        </div>
        {redeemData && (
          <p className="pt-4 text-sm text-green-500">
            You bought{" "}
            <span className="font-medium">{redeemData.quantity} products</span>,
            the hash is{" "}
            <span className="font-medium">{redeemData.purchaseHash}!</span> 🎉
          </p>
        )}
      </div>
    </div>
  )
}

export default ProductPurchaseCard
