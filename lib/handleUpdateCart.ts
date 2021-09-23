import { CookieSetOptions } from "universal-cookie"

export type ProductCart = {
  slicerAddress: string
  productId: number
  quantity: number
  price: number
  isUSD: boolean
}

const handleUpdateCart = async (
  cookies: {
    cart?: any
  },
  setCookie: (name: "cart", value: any, options?: CookieSetOptions) => void,
  productCart: ProductCart,
  slicerAddress: string,
  productId: number,
  price: number,
  isUSD: boolean,
  newQuantity: number
) => {
  const newCookies = cookies?.cart || []
  if (newCookies.length != 0 && productCart) {
    const quantity = productCart.quantity + newQuantity
    const index = newCookies.indexOf(productCart)
    if (quantity > 0) {
      newCookies[index] = {
        slicerAddress,
        productId,
        quantity,
        price,
        isUSD,
      }
    } else {
      newCookies.splice(index, 1)
    }
  } else if (newQuantity > 0) {
    const quantity = newQuantity
    newCookies.push({
      slicerAddress,
      productId,
      quantity,
      price,
      isUSD,
    })
  }
  setCookie("cart", newCookies)
}

export default handleUpdateCart
