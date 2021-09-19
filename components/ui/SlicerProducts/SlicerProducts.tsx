import { handleCleanup, reload } from "@lib/handleCreateProduct"
import fetcher from "@utils/fetcher"
import useQuery from "@utils/subgraphQuery"
import { useEffect, useState } from "react"
import useSWR from "swr"
import Button from "../Button"

type Product = {
  id: number
  productId: number
  name: string
  description: string
  creator: string
  hash: string
  image: string
}

type Props = {
  slicerId: string
  editMode: boolean
}

const SlicerProducts = ({ slicerId, editMode }: Props) => {
  const [loading, setLoading] = useState(false)
  const [showProducts, setShowProducts] = useState<Product[]>([])
  const [pendingProducts, setPendingProducts] = useState<Product[]>([])
  const { data: products } = useSWR(`/api/slicer/${slicerId}/products`, fetcher)

  const tokensQuery = /* GraphQL */ `
  products (where: {slicer: "${slicerId}"}) {
    id
    data
  }
`
  const subgraphData = useQuery(tokensQuery, [editMode])
  const blockchainProducts = subgraphData?.products

  useEffect(() => {
    setShowProducts(products?.data?.filter((p) => p.productId != null))
    setPendingProducts(products?.data?.filter((p) => p.productId == null))
  }, [products])

  return (
    <>
      {/* <ProductGrid product={showProducts} /> */}
      {editMode && (
        <div>
          <Button label="Add a new product" href={`${slicerId}/products/new`} />
          {(pendingProducts?.length != 0 ||
            blockchainProducts?.length > products?.data?.length) && (
            <div className="pt-12">
              <p className="pb-4">
                There are pending products for your slicer. <br />
                Click the button below to reload them.
              </p>
              <Button
                label="Reload products"
                type="button"
                loading={loading}
                onClick={() =>
                  pendingProducts?.length != 0
                    ? handleCleanup(Number(slicerId), setLoading)
                    : reload(Number(slicerId), setLoading)
                }
              />
            </div>
          )}
          <hr className="w-20 mx-auto mt-16 border-gray-300" />
        </div>
      )}
    </>
  )
}

export default SlicerProducts
