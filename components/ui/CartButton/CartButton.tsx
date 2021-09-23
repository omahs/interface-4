import Cart from "@components/icons/Cart"
import Minus from "@components/icons/Minus"
import Plus from "@components/icons/Plus"
import Trash from "@components/icons/Trash"
import handleUpdateCart, { ProductCart } from "@lib/handleUpdateCart"
import { useCookies } from "react-cookie"

type Props = {
  productCart: ProductCart
  slicerAddress: string
  productId: number
  price: number
  isUSD: boolean
  isMultiple: boolean
  labelAdd?: string
  labelRemove?: string
}

const CartButton = ({
  productCart,
  slicerAddress,
  productId,
  price,
  isUSD,
  isMultiple,
  labelAdd,
  labelRemove,
}: Props) => {
  const [cookies, setCookie] = useCookies(["cart"])

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
      {labelAdd && (
        <p className="mr-2 text-sm font-medium sm:text-base">{labelAdd}</p>
      )}
      <Cart className="w-5 h-5 mr-1 transition-transform duration-150 transform group-hover:rotate-[-20deg]" />
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
      {labelRemove && (
        <p className="mr-2 text-sm font-medium sm:text-base">{labelRemove}</p>
      )}
      <Trash className="w-5 h-5 mr-1 transition-transform duration-150 transform group-hover:rotate-[-20deg]" />
    </div>
  )
}

export default CartButton
