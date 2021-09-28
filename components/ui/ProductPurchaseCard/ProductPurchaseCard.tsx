import { useState } from "react"
import { Button, CardImage } from ".."
import { useAppContext } from "../context"
import handleRedeemProduct from "@utils/handleRedeemProduct"

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
  const { setModalView, connector } = useAppContext()
  const [loading, setLoading] = useState(false)

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
            onClick={() =>
              handleRedeemProduct(
                connector,
                slicerId,
                productId,
                name,
                image,
                uid,
                creator,
                setLoading,
                setModalView
              )
            }
          />
        </div>
      </div>
    </div>
  )
}

export default ProductPurchaseCard
