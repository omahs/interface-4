import { CookieSetOptions } from "universal-cookie"
import { ProductCart } from "@lib/handleUpdateCart"
import { ListCard } from ".."

type Props = {
  cookieCart: ProductCart[]
  ethUsd: { symbol: string; price: number }
  setCookie: (name: "cart", value: any, options?: CookieSetOptions) => void
}

const CartList = ({ cookieCart, ethUsd, setCookie }: Props) => {
  return (
    <div className="p-4 space-y-4 shadow-lg bg-sky-100 rounded-xl max-h-[300px] sm:max-h-[450px] max-w-[350px] overflow-y-scroll">
      {cookieCart?.map((product, key) => {
        const {
          slicerId,
          slicerAddress,
          productId,
          quantity,
          price,
          isUSD,
          name,
        } = product
        const productPrice = isUSD
          ? Math.floor((price * 100) / Number(ethUsd?.price)) / 10000
          : Math.floor(price / 10 ** 14) / 10000

        const index = cookieCart.findIndex(
          (p: ProductCart) => p.productId == productId
        )

        const handleRemove = () => {
          const newCookies = cookieCart
          newCookies.splice(index, 1)
          setCookie("cart", newCookies)
        }
        return (
          <ListCard
            key={key}
            label={name}
            sideLabel={`${slicerId} / #${productId}`}
            subLabel={`Ξ ${productPrice}${
              quantity != 1 ? ` x ${quantity}` : ""
            }`}
            href={`/slicer/${slicerId}`}
            remove={() => handleRemove()}
          />
        )
      })}
    </div>
  )
}

export default CartList
