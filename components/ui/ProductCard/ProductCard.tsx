import Cart from "@components/icons/Cart"
import { Card } from ".."
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
    <Card
      name={name}
      image={image}
      className="rounded-none"
      size="h-44"
      product={true}
      topRight={{
        title: "Product price",
        content: (
          <p className="text-sm font-medium text-black">
            {isUSD ? "$ " : "Ξ "}
            {isUSD ? Number(price) / 100 : Number(price) / 10 ** 18}
          </p>
        ),
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap items-center">
          <p className="mr-2 font-medium">{name}</p>
          <p className="h-full mt-0.5 text-gray-500 text-xs font-normal">
            #{productId}
          </p>
        </div>
        <div className="flex justify-center w-20 py-2 text-center text-white transition-colors duration-150 bg-green-500 rounded-md nightwind-prevent group hover:bg-green-600">
          <Cart className="w-5 h-5 mr-1 transition-transform duration-150 transform group-hover:rotate-[-20deg]" />
        </div>
      </div>
    </Card>
  )
}

export default ProductCard
