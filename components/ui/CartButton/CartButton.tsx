import Link from "next/link"
import Cart from "@components/icons/Cart"
import Minus from "@components/icons/Minus"
import Plus from "@components/icons/Plus"
import Trash from "@components/icons/Trash"
import handleUpdateCart, { ProductCart } from "@lib/handleUpdateCart"
import { useCookies } from "react-cookie"
import ShoppingBag from "@components/icons/ShoppingBag"

type Props = {
  productCart: ProductCart
  slicerId: number
  slicerAddress: string
  productId: number
  price: number
  isUSD: boolean
  name: string
  isMultiple: boolean
  purchasedQuantity: number
  labelAdd?: string
  labelRemove?: string
}

const CartButton = ({
  slicerId,
  productCart,
  slicerAddress,
  productId,
  price,
  isUSD,
  name,
  isMultiple,
  purchasedQuantity,
  labelAdd,
  labelRemove,
}: Props) => {
  const [cookies, setCookie] = useCookies(["cart"])

  return purchasedQuantity != 0 ? (
    <Link href="/purchases">
      <a className="relative z-10 flex items-center justify-center w-full py-2 text-center text-white transition-colors duration-150 bg-blue-500 rounded-md hover:text-white nightwind-prevent group hover:bg-blue-600">
        {labelAdd && (
          <p className="mr-2 text-sm font-medium sm:text-base">
            Go to purchases
          </p>
        )}
        <ShoppingBag className="w-5 h-5 mr-1 transition-transform duration-150 transform group-hover:rotate-[-20deg]" />
      </a>
    </Link>
  ) : !productCart ? (
    // not in cart, buy single
    <div
      className="relative z-10 flex items-center justify-center w-full py-2 text-center text-white transition-colors duration-150 bg-green-500 rounded-md nightwind-prevent group hover:bg-green-600"
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
          name,
          1
        )
      }
    >
      {labelAdd && (
        <p className="mr-2 text-sm font-medium sm:text-base">{labelAdd}</p>
      )}
      <Cart className="w-5 h-5 mr-1 transition-transform duration-150 transform group-hover:rotate-[-20deg]" />
    </div>
  ) : isMultiple ? (
    // In cart, buy/remove multiple
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
        className="flex items-center justify-center h-8 text-green-500 transition-colors duration-150 hover:bg-green-500 hover:text-white"
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
            name,
            1
          )
        }
      >
        <Plus className="w-[17px] h-[17px]" />
      </div>
    </div>
  ) : (
    // In cart, remove single
    <div
      className="relative z-10 flex items-center justify-center w-full py-2 text-center text-white transition-colors duration-150 bg-red-500 rounded-md nightwind-prevent group hover:bg-red-600"
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
          name,
          -1
        )
      }
    >
      {labelRemove && (
        <p className="mr-2 text-sm font-medium sm:text-base">{labelRemove}</p>
      )}
      <Trash className="w-5 h-5 mr-1 transition-transform duration-150 transform group-hover:rotate-[-20deg]" />
    </div>
  )
}

export default CartButton

// todo: if (!isMultiple && hasPurchased) { already bought option -> redirects to relative purchase }

// isMultiple
// purchasedQuantity
// productCart

// Is it purchased ?
//

// CART
// GO TO PURCHASE
// TRASH
// + -
