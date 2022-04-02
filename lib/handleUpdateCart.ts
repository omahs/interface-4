import { CookieSetOptions } from "universal-cookie"

export type ProductCart = {
  slicerId: string
  slicerAddress: string
  productId: number
  quantity: number
  price: number
  isUSD: boolean
  name: string
}

const handleUpdateCart = async (
  cookies: {
    cart?: any
  },
  setCookie: (name: "cart", value: any, options?: CookieSetOptions) => void,
  productCart: ProductCart,
  slicerId: number,
  slicerAddress: string,
  productId: number,
  price: string,
  isUSD: boolean,
  name: string,
  newQuantity: number
) => {
  const newCookies = cookies?.cart || []
  if (newCookies.length != 0 && productCart) {
    const quantity = productCart.quantity + newQuantity
    const index = newCookies.findIndex(
      (p: ProductCart) => p.productId == productId
    )
    if (quantity > 0) {
      newCookies[index] = {
        slicerId,
        slicerAddress,
        productId,
        quantity,
        price,
        isUSD,
        name
      }
    } else {
      newCookies.splice(index, 1)
    }
  } else if (newQuantity > 0) {
    const quantity = newQuantity
    newCookies.push({
      slicerId,
      slicerAddress,
      productId,
      quantity,
      price,
      isUSD,
      name
    })
  }
  setCookie("cart", newCookies)
}

export default handleUpdateCart
