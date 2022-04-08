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
  blockchainProducts
}: Props) => {
  const initItems = 8
  const [items, setItems] = useState(initItems)
  const [iterator, setIterator] = useState(0)

  const { data: ethUsd } = useSWR(
    "https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT",
    fetcher
  )

  useEffect(() => {
    setIterator(items < products?.length ? items : products?.length)
  }, [items, products])

  return products && products.length != 0 ? (
    <>
      <h2 className="pb-6">Products</h2>
      <div className="grid items-center justify-center grid-cols-1 gap-8 max-w-[400px] mx-auto sm:max-w-none sm:grid-cols-2">
        {[...Array(iterator)].map((i, key) => {
          const product = products.find((p) => p.productId == Number(key) + 1)
          const chainInfo = blockchainProducts?.find(
            (p) => p.id.split("-").pop() == product?.productId
          )

          return product ? (
            <ProductCard
              slicerId={slicerId}
              slicerAddress={slicerAddress}
              key={key}
              product={product}
              chainInfo={chainInfo}
              editMode={editMode}
              ethUsd={ethUsd}
            />
          ) : null
        })}
      </div>
      {items < products?.length && (
        <p className="py-6 text-center">
          <a onClick={() => setItems(items + initItems)}>Load more</a>
        </p>
      )}
    </>
  ) : null
}

export default ProductsGrid
