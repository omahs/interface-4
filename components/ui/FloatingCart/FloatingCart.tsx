import { ProductCart } from "@lib/handleUpdateCart"
import fetcher from "@utils/fetcher"
import { useCookies } from "react-cookie"
import useSWR from "swr"
import { CartList } from ".."

type Props = {}

const FloatingCart = ({}: Props) => {
  const [cookies] = useCookies(["cart"])
  const cookieCart: ProductCart[] = cookies?.cart

  const { data: ethUsd } = useSWR(
    "https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT",
    fetcher
  )

  const reducer = (previousValue, currentValue) => {
    const { quantity, price, isUSD } = currentValue
    const productPrice = isUSD
      ? Math.floor((price * 10) / Number(ethUsd?.price)) / 1000
      : Math.floor(price / 10 ** 14) / 10000
    return previousValue + productPrice * quantity
  }
  const totalPrice = cookieCart?.reduce(reducer, 0)

  return (
    cookieCart?.length != 0 && (
      <div className="fixed z-20 bottom-0 mb-[20px] right-[20px]">
        <div className="p-8 bg-blue-600 rounded-md">
          {/* <CartList cookieCart={cookieCart} ethUsd={ethUsd} /> */}
          <p>{Math.round(totalPrice * 1000) / 1000}</p>
        </div>
      </div>
    )
  )
}

export default FloatingCart
