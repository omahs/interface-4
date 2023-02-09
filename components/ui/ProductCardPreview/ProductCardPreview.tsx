import ShoppingBag from "@components/icons/ShoppingBag"
import { Card } from ".."

const ProductCardPreview = () => {
  return (
    <div className="flex items-center justify-center max-w-[304px] mx-auto py-6">
      <div className="relative flex-grow h-full">
        <Card
          product
          name="A slice product"
          containerClassName="h-full"
          cardClassName="flex flex-col h-full overflow-hidden rounded-xl backdrop-blur-0 shadow-medium-random-fixed"
          className="rounded-none opacity-40"
          size="h-52"
          disableHover
        >
          <div className="h-full mb-14">
            <div className="flex items-center justify-between opacity-40">
              <div className="mt-1.5">
                <p className="font-medium">A slice product</p>
              </div>
            </div>
            <div className="absolute bottom-0 w-full px-5 mb-5 transform -translate-x-1/2 left-1/2">
              <div className="relative z-10 flex items-center justify-center w-full text-center text-white transition-colors duration-150 bg-blue-500 rounded-md h-9 nightwind-prevent">
                <p className="mr-2 text-sm font-medium sm:text-base">Redeem</p>
                <ShoppingBag className="w-5 h-5" />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default ProductCardPreview
