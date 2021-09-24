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
  const totalPrice: number = cookieCart?.reduce(reducer, 0) || 0

  return (
    <div
      className={`fixed bottom-0 mb-[20px] right-[20px] transition-opacity duration-200 ${
        cookieCart?.length != 0 ? "z-20 opacity-100" : "-z-10 opacity-0"
      }`}
    >
      <div className="px-16 py-4 bg-blue-600 rounded-full">
        {/* <CartList cookieCart={cookieCart} ethUsd={ethUsd} /> */}
        {totalPrice != 0 && <p>{Math.round(totalPrice * 1000) / 1000}</p>}
      </div>
    </div>
  )
}

export default FloatingCart
