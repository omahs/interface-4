import { Dispatch, SetStateAction } from "react"
import { Purchase } from "@components/ui/context"
import { ProductCart } from "@lib/handleUpdateCart"

export const getPurchases = async (
  buyer: string,
  setPurchases: Dispatch<SetStateAction<Purchase[]>>
) => {
  const client = (await import("@utils/apollo-client")).default
  const { gql } = await import("@apollo/client")

  const tokensQuery = /* GraphQL */ `
    payee (id: "${buyer.toLowerCase()}") {
      purchases (orderBy: "lastPurchasedAtTimestamp", orderDirection: "desc") {
        id
        quantity
      }
    }`

  const { data } = await client.query({
    query: gql`
      query {
        ${tokensQuery}
      }
    `
  })
  const payeePurchases = data?.payee?.purchases
  let purchasesList: Purchase[] = []
  payeePurchases?.map((p) => {
    const id = p.id.split("-")
    const slicerId = parseInt(id[0], 16).toString()
    const productId = parseInt(id[1], 16).toString()

    purchasesList.push({ slicerId, productId, quantity: p.quantity })
  })
  setPurchases(purchasesList)
}

export const productsToPurchases = (products: ProductCart[]) => {
  let purchasesList: Purchase[] = []
  products.map((p) => {
    purchasesList.push({
      slicerId: String(p.slicerId),
      productId: String(p.productId),
      quantity: String(p.quantity)
    })
  })
  return purchasesList
}
