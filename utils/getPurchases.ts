import { Dispatch, SetStateAction } from "react"
import client from "@utils/apollo-client"
import { gql } from "@apollo/client"
import { Purchase } from "@components/ui/context"

export const getPurchases = async (
  buyer: string,
  setPurchases: Dispatch<SetStateAction<Purchase[]>>
) => {
  const tokensQuery = /* GraphQL */ `
      payee (id: "${buyer.toLowerCase()}") {
      purchases {
        id
        quantity
      }
    }`

  const { data } = await client.query({
    query: gql`
      query {
        ${tokensQuery}
      }
    `,
  })
  const payeePurchases = data?.payee?.purchases
  let purchasesList: Purchase[] = []
  payeePurchases.map((p) => {
    const id = p.id.split("-")
    const slicerId = id[0]
    const productId = id[1]
    purchasesList.push({ slicerId, productId, quantity: p.quantity })
  })
  setPurchases(purchasesList)
}
