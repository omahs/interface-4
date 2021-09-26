import Button from "../Button"
import { useEffect, useState } from "react"
import { SlicerReduced } from "pages/slicer"
import { Card } from ".."
import Collectible from "@components/icons/Collectible"

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
            <Card
              key={key}
              name={slicerName}
              image={image}
              href={slicerLink}
              className="rounded-none"
              size="h-44"
              topLeft={
                isCollectible && {
                  title: "Collectible asset",
                  content: (
                    <Collectible className="py-2 text-indigo-600 w-[38px] h-[38px]" />
                  ),
                  padding: "px-4",
                }
              }
            >
              <p className="mr-2 text-lg font-medium">{slicerName}</p>
            </Card>
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
