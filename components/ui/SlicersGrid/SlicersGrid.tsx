import Link from "next/link"
import Button from "../Button"
import { useEffect, useState } from "react"
import SlicerCardImage from "../SlicerCardImage"
import { SlicerReduced } from "pages/slicer"

type Props = {
  data: SlicerReduced[]
  totalSlicers: number
}

const SlicersGrid = ({ data, totalSlicers }: Props) => {
  const initItems = 12
  const [items, setItems] = useState(initItems)
  const [iterator, setIterator] = useState(0)

  useEffect(() => {
    setIterator(items < totalSlicers ? items : totalSlicers)
  }, [items])

  return (
    <>
      <div className="grid items-center justify-center grid-cols-1 gap-2 max-w-[400px] sm:gap-4 lg:gap-5 sm:max-w-[550px] mx-auto sm:grid-cols-2 md:max-w-none md:grid-cols-3">
        {[...Array(iterator)].map((el, key) => {
          const slicerId = Number(key)
          const slicerData = data.find((el) => el.id === slicerId)
          const { name, image, isCollectible } = slicerData || {
            name: `Slicer #${slicerId}`,
            image: "",
            isCollectible: false,
          }
          const slicerLink = `/slicer/${slicerId}`
          const slicerName = name || `Slicer #${slicerId}`
          return (
            <div className="my-6" key={key}>
              <Link href={slicerLink}>
                <a>
                  <div className="flex flex-col items-center px-2.5 py-5 transition-all duration-1000 ease-out bg-white rounded-md shadow-medium-random hover:scale-105">
                    <SlicerCardImage
                      name={slicerName}
                      imageUrl={image}
                      isCollectible={isCollectible}
                      showAddress={false}
                      size="w-full h-52 sm:h-40 md:h-40 lg:h-48"
                    />
                    <div className="w-full pt-5 pl-2 text-left sm:pt-4">
                      <p className="inline-block text-xl">{slicerName}</p>
                    </div>
                  </div>
                </a>
              </Link>
            </div>
          )
        })}
      </div>
      <div className="pt-10 pb-4 space-y-8">
        {items < totalSlicers && (
          <p className="text-center">
            <a onClick={() => setItems(items + initItems)}>Load more</a>
          </p>
        )}
        <div className="flex justify-center">
          <Button label="Create a new slicer" href="/slice" />
        </div>
      </div>
    </>
  )
}

export default SlicersGrid
