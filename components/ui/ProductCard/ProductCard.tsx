import Cart from "@components/icons/Cart"
import Link from "next/link"
import { SlicerImage } from ".."
import { Product } from "../SlicerProducts/SlicerProducts"

type Props = {
  product: Product
  editMode: boolean
  chainInfo: any
}

const ProductCard = ({ product, chainInfo, editMode }: Props) => {
  const { productId, name, description, hash, image } = product
  const {
    price,
    isUSD,
    isInfinite,
    isMultiple,
    availableUnits,
    totalPurchases,
  } = chainInfo

  return (
    <div className="my-6">
      <Link href={`/`}>
        <a>
          <div className="transition-all duration-1000 ease-out bg-white rounded-xl shadow-medium-random hover:scale-105">
            <div className="relative w-full overflow-hidden h-44 rounded-t-xl nightwind-prevent-block img-background">
              <SlicerImage name={name} imageUrl={image} product={true} />
              <div className="absolute top-0 right-0 flex items-center justify-center min-w-[80px] px-6 py-2.5 shadow-md bg-white rounded-bl-xl">
                <p className="text-sm text-black">
                  {isUSD ? "$ " : "Ξ "}
                  {isUSD ? Number(price) / 100 : Number(price) / 10 ** 18}
                </p>
              </div>
            </div>
            <div className="w-full px-5 py-4 text-left">
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap items-center">
                  <p className="mr-2">{name}</p>
                  <p className="h-full mt-0.5 text-gray-500 text-xs font-normal">
                    #{productId}
                  </p>
                </div>
                <div className="flex justify-center w-20 py-2 text-center text-white transition-colors duration-150 bg-green-500 rounded-md nightwind-prevent group hover:bg-green-600">
                  <Cart className="w-5 h-5 mr-1 transition-transform duration-150 transform group-hover:rotate-[-20deg]" />
                </div>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  )
}

export default ProductCard
