import Spinner from "@components/icons/Spinner"
import fetcher from "@utils/fetcher"
import { useEffect, useState } from "react"
import useSWR from "swr"
import { ProductCard } from ".."
import { Product } from "../SlicerProducts/SlicerProducts"

type Props = {
  slicerId: number
  slicerAddress: string
  products: Product[]
  editMode: boolean
  blockchainProducts: any
}

const ProductsGrid = ({
  slicerId,
  slicerAddress,
  products,
  editMode,
  blockchainProducts,
}: Props) => {
  const initItems = 4
  const [items, setItems] = useState(initItems)
  const [iterator, setIterator] = useState(0)

  const { data: ethUsd } = useSWR(
    "https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT",
    fetcher
  )

  useEffect(() => {
    setIterator(items < products?.length ? items : products?.length)
  }, [items, products])

  return products ? (
    blockchainProducts ? (
      <>
        <h2>Products</h2>
        <div className="grid items-center justify-center grid-cols-1 gap-4 max-w-[400px] sm:gap-8 mx-auto sm:max-w-none sm:grid-cols-2">
          {[...Array(iterator)].map((i, key) => {
            const product = products.find((p) => p.productId == Number(key) + 1)
            const chainInfo = blockchainProducts.find(
              (p) => p.id.split("-").pop() == product.productId
            )

            return (
              <ProductCard
                slicerId={slicerId}
                slicerAddress={slicerAddress}
                key={key}
                product={product}
                chainInfo={chainInfo}
                editMode={editMode}
                ethUsd={ethUsd}
              />
            )
          })}
        </div>
        {items < products?.length && (
          <p className="pb-6 text-center">
            <a onClick={() => setItems(items + initItems)}>Load more</a>
          </p>
        )}
      </>
    ) : (
      <div className="text-center">
        <h2>Products</h2>
        <div className="flex justify-center py-14">
          <Spinner size="h-10 w-10" />
        </div>
      </div>
    )
  ) : null
}

export default ProductsGrid
