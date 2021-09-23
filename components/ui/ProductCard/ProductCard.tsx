import Cart from "@components/icons/Cart"
import ShoppingBag from "@components/icons/ShoppingBag"
import { PayProducts } from "@lib/handlers/chain"
import formatNumber from "@utils/formatNumber"
import { useEffect, useState } from "react"
import { Card } from ".."
import { useAppContext } from "../context"
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
  const { setModalView } = useAppContext()
  const { productId, name, description, hash, image, purchaseInfo } = product
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

  const productPrice = {
    eth: `Ξ ${isUSD ? convertedEthUsd : Math.floor(price / 10 ** 14) / 10000}`,
    usd: `$ ${isUSD ? formatNumber(price / 100) : convertedEthUsd}`,
  }

  const handleOnClick = () => {
    setModalView({
      name: "PRODUCT_VIEW",
      cross: true,
      params: {
        productId,
        name,
        description,
        image,
        productPrice,
        isUSD,
        isInfinite,
        isMultiple,
        availableUnits,
        totalPurchases,
        purchaseInfo,
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

  const testBuy = async () => {
    await PayProducts(
      [slicerId],
      [slicerAddress],
      [String(productId)],
      [1],
      price
    )
  }

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
      onClick={() => handleOnClick()}
    >
      <>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap items-center mr-24">
            <p className="mr-2 font-medium">{name}</p>
            <p className="h-full mt-0.5 text-gray-500 text-xs font-normal">
              #{productId}
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 flex items-center justify-center w-24 h-full my-auto mr-5">
          <div
            className="absolute w-full h-full"
            onClick={() => handleOnClick()}
          />

          <div
            className="relative z-10 flex items-center justify-center w-full py-2 text-center text-white transition-colors duration-150 bg-green-500 rounded-md nightwind-prevent group hover:bg-green-600"
            onClick={async () => await testBuy()}
          >
            <Cart className="w-5 h-5 mr-1 transition-transform duration-150 transform group-hover:rotate-[-20deg]" />
          </div>
        </div>
      </>
    </Card>
  )
}

export default ProductCard
