import Link from "next/link"
import Button from "../Button"
import { useEffect, useState } from "react"
import SlicerCardImage from "../SlicerCardImage"
import { SlicerReduced } from "pages/slicer"
import { Product } from "../SlicerProducts/SlicerProducts"

type Props = {
  products: Product[]
  editMode: boolean
}

const ProductsGrid = ({ products, editMode }: Props) => {
  const initItems = 4
  const [items, setItems] = useState(initItems)
  const [iterator, setIterator] = useState(0)

  useEffect(() => {
    setIterator(items < products?.length ? items : products?.length)
  }, [items, products])

  return products ? (
    <>
      <h2>Products</h2>
      <div className="grid items-center justify-center grid-cols-1 gap-2 max-w-[400px] sm:gap-4 lg:gap-5 sm:max-w-[550px] mx-auto md:max-w-none md:grid-cols-2">
        {[...Array(iterator)].map((i, key) => {
          const { productId, name, description, hash, image } = products[key]

          console.log(image)
          return (
            <div className="my-6" key={key}>
              <Link href={`/`}>
                <a>
                  <div className="flex flex-col items-center px-2.5 py-5 transition-all duration-1000 ease-out bg-white rounded-md shadow-medium-random hover:scale-105">
                    <SlicerCardImage
                      name={name}
                      imageUrl={image}
                      showAddress={false}
                      size="w-full h-52 sm:h-40 md:h-40 lg:h-48"
                    />
                    <div className="w-full pt-5 pl-2 text-left sm:pt-4">
                      <p className="inline-block text-xl">{name}</p>
                    </div>
                  </div>
                </a>
              </Link>
            </div>
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
