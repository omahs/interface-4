import Cart from "@components/icons/Cart"
import Minus from "@components/icons/Minus"
import Plus from "@components/icons/Plus"
import Trash from "@components/icons/Trash"
import handleUpdateCart, { ProductCart } from "@lib/handleUpdateCart"
import { useCookies } from "react-cookie"
import ShoppingBag from "@components/icons/ShoppingBag"
import { useAppContext } from "../context"
import { useState } from "react"
import handleRedeemProduct from "@utils/handleRedeemProduct"
import Spinner from "@components/icons/Spinner"

type Props = {
  productCart: ProductCart
  slicerId: number
  slicerAddress: string
  productId: number
  price: string
  isUSD: boolean
  extCallValue: string
  name: string
  image: string
  isMultiple: boolean
  uid: string
  creator: string
  texts: {
    thanks?: string
    instructions?: string
  }
  availableUnits: number
  purchasedQuantity: number
  labelAdd?: string
  labelRemove?: string
  preview?: boolean
}

const CartButton = ({
  slicerId,
  productCart,
  slicerAddress,
  productId,
  price,
  isUSD,
  extCallValue,
  name,
  isMultiple,
  image,
  uid,
  creator,
  texts,
  availableUnits,
  purchasedQuantity,
  labelAdd,
  labelRemove,
  preview
}: Props) => {
  const { setModalView, connector } = useAppContext()
  const [loading, setLoading] = useState(false)
  const [cookies, setCookie] = useCookies(["cart"])

  const adjustedAvailability = availableUnits - productCart?.quantity

  return purchasedQuantity != 0 ? (
    <div
      className="relative z-10 flex items-center justify-center w-full py-2 text-center text-white transition-colors duration-150 bg-blue-500 rounded-md hover:text-white nightwind-prevent group-cart hover:bg-blue-600"
      onClick={() =>
        handleRedeemProduct(
          connector,
          slicerId,
          productId,
          name,
          image,
          uid,
          creator,
          texts,
          setLoading,
          setModalView
        )
      }
    >
      {labelAdd ? (
        <p className="mr-2 text-sm font-medium sm:text-base">
          {`Redeem${purchasedQuantity != 1 ? ` (${purchasedQuantity})` : ""}`}
        </p>
      ) : (
        purchasedQuantity != 1 && (
          <p className="mr-2 text-sm font-medium sm:text-base">
            {purchasedQuantity}
          </p>
        )
      )}
      {loading ? (
        <Spinner color="text-white nightwind-prevent" />
      ) : (
        <ShoppingBag className="w-5 h-5 group-cart-el" />
      )}
    </div>
  ) : !productCart ? (
    <div
      className={`relative z-10 flex items-center justify-center w-full py-2 text-center text-white rounded-md nightwind-prevent ${
        availableUnits != 0
          ? "group-cart bg-green-500 hover:bg-green-600 transition-colors duration-150"
          : "bg-gray-400"
      }`}
      onClick={async () =>
        !preview &&
        availableUnits != 0 &&
        (await handleUpdateCart(
          cookies,
          setCookie,
          productCart,
          slicerId,
          slicerAddress,
          productId,
          price,
          isUSD,
          extCallValue,
          name,
          1
        ))
      }
    >
      {labelAdd && (
        <p className="mr-2 text-sm font-medium sm:text-base">{labelAdd}</p>
      )}
      <Cart className="w-5 h-5 mr-1 group-cart-el" />
    </div>
  ) : isMultiple ? (
    <div className="relative z-10 grid items-center justify-center w-full grid-cols-3 overflow-hidden text-center bg-white border border-gray-100 rounded-md shadow-md">
      <div
        className="flex items-center justify-center h-8 text-red-500 transition-colors duration-150 hover:bg-red-500 hover:text-white"
        onClick={async () =>
          await handleUpdateCart(
            cookies,
            setCookie,
            productCart,
            slicerId,
            slicerAddress,
            productId,
            price,
            isUSD,
            extCallValue,
            name,
            -1
          )
        }
      >
        <Minus className="w-[17px] h-[17px]" />
      </div>
      <div className="flex items-center justify-center h-8 text-sm text-black border-l border-r border-gray-200 cursor-default">
        <p>{productCart.quantity}</p>
      </div>
      <div
        className={`flex items-center justify-center h-8 transition-colors duration-150 ${
          adjustedAvailability != 0
            ? "text-green-500 hover:bg-green-500 hover:text-white"
            : "text-white bg-gray-400"
        }`}
        onClick={async () =>
          adjustedAvailability != 0 &&
          (await handleUpdateCart(
            cookies,
            setCookie,
            productCart,
            slicerId,
            slicerAddress,
            productId,
            price,
            isUSD,
            extCallValue,
            name,
            1
          ))
        }
      >
        <Plus className="w-[17px] h-[17px]" />
      </div>
    </div>
  ) : (
    <div
      className="relative z-10 flex items-center justify-center w-full py-2 text-center text-white transition-colors duration-150 bg-red-500 rounded-md nightwind-prevent group-cart hover:bg-red-600"
      onClick={async () =>
        await handleUpdateCart(
          cookies,
          setCookie,
          productCart,
          slicerId,
          slicerAddress,
          productId,
          price,
          isUSD,
          extCallValue,
          name,
          -1
        )
      }
    >
      {labelRemove && (
        <p className="mr-2 text-sm font-medium sm:text-base">{labelRemove}</p>
      )}
      <Trash className="w-5 h-5 mr-1 group-cart-el" />
    </div>
  )
}

export default CartButton
