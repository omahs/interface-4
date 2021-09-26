import { Product } from ".prisma/client"
import { ListLayout, ProductPurchaseCard } from "@components/ui"
import { Purchase, useAppContext } from "@components/ui/context"
import fetcher from "@utils/fetcher"
import { useEffect, useState } from "react"
import useSWR from "swr"

const PurchasesList = () => {
  const { purchases } = useAppContext()
  const [purchaseQuery, setPurchaseQuery] = useState("")
  const [iterator, setIterator] = useState(0)

  const { data: purchaseData } = useSWR(
    purchaseQuery ? `/api/slicer/products?list=${purchaseQuery}` : null,
    fetcher
  )

  useEffect(() => {
    if (purchases) {
      let queryString = ""
      purchases.forEach((purchase: Purchase) => {
        const { slicerId, productId } = purchase
        queryString += `${slicerId}-${productId}_`
      })
      const formattedQuery = queryString.substring(0, queryString.length - 1)
      setPurchaseQuery(formattedQuery)
    }
  }, [purchases])

  return (
    <ListLayout
      elementsArray={purchases}
      setIterator={setIterator}
      actionScreenText="You haven't purchased anything yet"
      actionScreenHref="/slicer"
      actionScreenButtonLabel="Browse slicers"
    >
      <>
        {[...Array(iterator)].map((el, key) => {
          const i = Number(key)
          const index = purchaseData?.findIndex(
            (p: Product) =>
              p.slicerId == purchases[i].slicerId &&
              p.productId == purchases[i].productId
          )
          const slicerId = purchases[i].slicerId
          const productId = purchases[i].productId
          const name = purchaseData && purchaseData[index].name
          const hash = purchaseData && purchaseData[index].hash
          const image = purchaseData && purchaseData[index].image
          const purchaseElArray =
            purchaseData &&
            Object.keys(purchaseData[index].purchaseInfo).filter(
              (el) => purchaseData[index].purchaseInfo[el] == true
            )
          const purchaseInfo = purchaseElArray?.join(", ") || ""

          return (
            <div className="mt-3" key={key}>
              <ProductPurchaseCard
                slicerId={slicerId}
                productId={productId}
                name={name}
                hash={hash}
                image={image}
                purchaseInfo={purchaseInfo}
              />
              {i + 1 != iterator && (
                <hr className="w-20 mx-auto my-16 border-gray-300" />
              )}
            </div>
          )
        })}
      </>
    </ListLayout>
  )
}

export default PurchasesList
