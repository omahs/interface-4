import useQuery from "@utils/subgraphQuery"
import { useEffect, useState } from "react"
import { ProductCard } from ".."
import { Product } from "../SlicerProducts/SlicerProducts"

type Props = {
  products: Product[]
  editMode: boolean
  blockchainProducts: any
}

const ProductsGrid = ({ products, editMode, blockchainProducts }: Props) => {
  const initItems = 4
  const [items, setItems] = useState(initItems)
  const [iterator, setIterator] = useState(0)

  useEffect(() => {
    setIterator(items < products?.length ? items : products?.length)
  }, [items, products])

  return products && blockchainProducts ? (
    <>
      <h2>Products</h2>
      <div className="grid items-center justify-center grid-cols-1 gap-4 max-w-[400px] sm:gap-8  sm:max-w-[550px] mx-auto md:max-w-none md:grid-cols-2">
        {[...Array(iterator)].map((i, key) => {
          const product = products.find((p) => p.productId == Number(key) + 1)
          const chainInfo = blockchainProducts.find(
            (p) => p.id.split("-").pop() == product.productId
          )

          return (
            <ProductCard
              product={product}
              chainInfo={chainInfo}
              editMode={editMode}
              key={key}
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
    <p>No products</p>
  )
}

export default ProductsGrid

/**
 * What's on the product card
 * - name
 * - product id
 * - image
 * - price -> Subgraph
 * - quick add to bag
 * - n. of times purchased -> Subgraph?
 *
 */
