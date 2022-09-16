import { CookieSetOptions } from "universal-cookie"
import { ProductCart } from "@lib/handleUpdateCart"
import { ListCard } from ".."
import { utils } from "ethers"

type Props = {
  cookieCart: ProductCart[]
  ethUsd: { symbol: string; price: number }
  setCookie: (name: "cart", value: any, options?: CookieSetOptions) => void
}

const CartList = ({ cookieCart, ethUsd, setCookie }: Props) => {
  return (
    <div className="p-3 space-y-3 shadow-lg bg-gray-300 rounded-xl max-h-[300px] sm:max-h-[450px] w-[21rem] sm:w-[22rem] overflow-y-scroll">
      {cookieCart?.map((product, key) => {
        const {
          slicerId,
          slicerAddress,
          productId,
          quantity,
          price,
          isUSD,
          extCallValue,
          name,
          isCustomPriced
        } = product
        const productPrice = isUSD
          ? Math.floor((price * 100) / Number(ethUsd?.price)) / 10000
          : Math.floor(price / 10 ** 14) / 10000
        const externalCallEth = utils.formatEther(extCallValue)

        const index = cookieCart.findIndex(
          (p: ProductCart) =>
            p.productId == productId && p.slicerAddress == slicerAddress
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
            subLabel={`Ξ ${
              Math.floor((productPrice + Number(externalCallEth)) * 10000) /
              10000
            }${quantity != 1 ? ` x ${quantity}` : ""}`}
            href={`/slicer/${slicerId}?product=${productId}`}
            remove={() => handleRemove()}
            isCustomPriced={isCustomPriced}
          />
        )
      })}
    </div>
  )
}

export default CartList
