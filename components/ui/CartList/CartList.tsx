import Trash from "@components/icons/Trash"
import { ProductCart } from "@lib/handleUpdateCart"

type Props = {
  cookieCart: ProductCart[]
  ethUsd: { symbol: string; price: number }
}

const CartList = ({ cookieCart, ethUsd }: Props) => {
  return (
    <>
      {cookieCart?.map((product, key) => {
        const { slicerId, slicerAddress, productId, quantity, price, isUSD } =
          product
        const productPrice = isUSD
          ? Math.floor((price * 10) / Number(ethUsd?.price)) / 1000
          : Math.floor(price / 10 ** 14) / 10000
        return (
          <div key={key}>
            <p>
              {slicerId} / #{productId}
            </p>
            <p>
              {productPrice} (x{quantity})
            </p>
            {/* Plus / minus */}
            <Trash /> {/* remove */}
          </div>
        )
      })}
    </>
  )
}

export default CartList
