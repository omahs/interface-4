import Cart from "@components/icons/Cart"
import Minus from "@components/icons/Minus"
import Plus from "@components/icons/Plus"
import Trash from "@components/icons/Trash"
import handleUpdateCart, { ProductCart } from "@lib/handleUpdateCart"
import { Product } from "../SlicerProducts/SlicerProducts"
import { CookieSetOptions } from "universal-cookie"

type Props = {
  productCart: ProductCart
  slicerAddress: string
  productId: number
  price: number
  cookies: {
    cart?: any
  }
  setCookie: (name: "cart", value: any, options?: CookieSetOptions) => void
  isUSD: boolean
  isMultiple: boolean
}

const CartButton = ({
  productCart,
  slicerAddress,
  productId,
  price,
  cookies,
  setCookie,
  isUSD,
  isMultiple,
}: Props) => {
  return !productCart ? (
    <div
      className="relative z-10 flex items-center justify-center w-full py-2 text-center text-white transition-colors duration-150 bg-green-500 rounded-md nightwind-prevent group hover:bg-green-600"
      onClick={async () =>
        await handleUpdateCart(
          cookies,
          setCookie,
          productCart,
          slicerAddress,
          productId,
          price,
          isUSD,
          1
        )
      }
    >
      <Cart className="w-5 h-5 mr-1 transition-transform duration-150 transform group-hover:rotate-[-20deg]" />
    </div>
  ) : isMultiple ? (
    <div className="relative z-10 flex items-center justify-center w-full overflow-hidden text-center bg-white border border-gray-100 rounded-md shadow-md">
      <div
        className="flex items-center justify-center flex-1 h-8 transition-colors duration-150 hover:bg-red-500 hover:text-white"
        onClick={async () =>
          await handleUpdateCart(
            cookies,
            setCookie,
            productCart,
            slicerAddress,
            productId,
            price,
            isUSD,
            -1
          )
        }
      >
        <Minus className="w-[17px] h-[17px]" />
      </div>
      <div className="h-8 border border-gray-200" />
      <div className="w-8 h-5 text-sm text-black cursor-default ">
        {productCart.quantity}
      </div>
      <div className="h-8 border border-gray-200" />
      <div
        className="flex items-center justify-center flex-1 h-8 transition-colors duration-150 hover:bg-green-500 hover:text-white"
        onClick={async () =>
          await handleUpdateCart(
            cookies,
            setCookie,
            productCart,
            slicerAddress,
            productId,
            price,
            isUSD,
            1
          )
        }
      >
        <Plus className="w-[17px] h-[17px]" />
      </div>
    </div>
  ) : (
    <div
      className="relative z-10 flex items-center justify-center w-full py-2 text-center text-white transition-colors duration-150 bg-red-500 rounded-md nightwind-prevent group hover:bg-red-600"
      onClick={async () =>
        await handleUpdateCart(
          cookies,
          setCookie,
          productCart,
          slicerAddress,
          productId,
          price,
          isUSD,
          -1
        )
      }
    >
      <Trash className="w-5 h-5 mr-1 transition-transform duration-150 transform group-hover:rotate-[-20deg]" />
    </div>
  )
}

export default CartButton
