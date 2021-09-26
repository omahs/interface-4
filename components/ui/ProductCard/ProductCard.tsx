import ShoppingBag from "@components/icons/ShoppingBag"
import Units from "@components/icons/Units"
import { ProductCart } from "@lib/handleUpdateCart"
import formatNumber from "@utils/formatNumber"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { Card, CartButton } from ".."
import { Purchase, useAppContext } from "../context"
import { Product } from "../SlicerProducts/SlicerProducts"

type Props = {
  slicerId: number
  slicerAddress: string
  product: Product
  chainInfo: any
  ethUsd: {
    symbol: string
    price: string
  }
  editMode: boolean
}

const ProductCard = ({
  slicerId,
  slicerAddress,
  product,
  chainInfo,
  ethUsd,
  editMode,
}: Props) => {
  const [cookies] = useCookies(["cart"])
  const { setModalView, purchases } = useAppContext()
  const {
    productId,
    name,
    description,
    hash,
    image,
    purchaseInfo,
    uid,
    creator,
  } = product
  const {
    price,
    isUSD,
    isInfinite,
    isMultiple,
    availableUnits,
    totalPurchases,
    createdAtTimestamp,
  } = chainInfo

  const [convertedEthUsd, setConvertedEthUsd] = useState(0)
  const [purchasedQuantity, setPurchasedQuantity] = useState(0)

  const productPrice = {
    eth: `Ξ ${isUSD ? convertedEthUsd : Math.floor(price / 10 ** 14) / 10000}`,
    usd: `$ ${isUSD ? formatNumber(price / 100) : convertedEthUsd}`,
  }
  const cookieCart: ProductCart[] = cookies?.cart
  const productCart: ProductCart = cookieCart?.find(
    (product) =>
      product.slicerAddress == slicerAddress && product.productId == productId
  )
  const availabilityColor =
    availableUnits < 10
      ? availableUnits == 0
        ? "text-red-500"
        : "text-yellow-600"
      : "text-green-600"

  useEffect(() => {
    purchases?.map((p: Purchase) => {
      if (
        p.slicerId === String(slicerId) &&
        p.productId === String(productId)
      ) {
        setPurchasedQuantity(Number(p.quantity))
      }
    })
  }, [purchases])

  const handleOnClick = () => {
    setModalView({
      name: "PRODUCT_VIEW",
      cross: true,
      params: {
        slicerId,
        productId,
        name,
        description,
        image,
        uid,
        creator,
        productPrice,
        isUSD,
        isInfinite,
        isMultiple,
        availableUnits,
        totalPurchases,
        purchaseInfo,
        slicerAddress,
        price,
        editMode,
        purchasedQuantity,
        availabilityColor,
      },
    })
  }

  useEffect(() => {
    if (price && ethUsd) {
      if (isUSD) {
        const convertedPrice =
          Math.floor((price * 10) / Number(ethUsd?.price)) / 1000
        setConvertedEthUsd(convertedPrice)
      } else {
        const convertedPrice =
          Math.floor((price / 10 ** 16) * Number(ethUsd?.price)) / 100
        setConvertedEthUsd(convertedPrice)
      }
    }
  }, [price, ethUsd])

  return (
    <Card
      name={name}
      image={image}
      className="rounded-none"
      size="h-44"
      product={true}
      topLeft={{
        title: "Purchases",
        content: (
          <>
            <p className="mr-2 text-indigo-600">
              {formatNumber(totalPurchases)}
            </p>
            <ShoppingBag className="w-[18px] h-[18px] text-indigo-600" />
          </>
        ),
      }}
      topRight={{
        title: "Product price",
        content: (
          <p className="text-sm font-medium text-black">{productPrice.eth}</p>
        ),
      }}
      bottomLeft={
        !isInfinite && {
          title: "Available units",
          content: (
            <>
              <p className={`mr-2 ${availabilityColor}`}>
                {formatNumber(availableUnits)}
              </p>
              <Units className={`w-[18px] h-[18px] ${availabilityColor}`} />
            </>
          ),
        }
      }
      onClick={() => handleOnClick()}
    >
      <>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap items-center mr-24">
            <p className="mr-2 font-medium">{name}</p>
            <p className="h-5 mt-1 text-xs font-normal text-gray-500">
              #{productId}
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 flex items-center justify-center w-24 h-full my-auto mr-5">
          <div
            className="absolute w-full h-full"
            onClick={() => handleOnClick()}
          />
          {!editMode && (
            <CartButton
              slicerId={slicerId}
              productCart={productCart}
              slicerAddress={slicerAddress}
              productId={productId}
              price={price}
              isUSD={isUSD}
              image={image}
              name={name}
              isMultiple={isMultiple}
              availableUnits={isInfinite ? -1 : availableUnits}
              purchasedQuantity={purchasedQuantity}
              uid={uid}
              creator={creator}
            />
          )}
        </div>
      </>
    </Card>
  )
}

export default ProductCard
