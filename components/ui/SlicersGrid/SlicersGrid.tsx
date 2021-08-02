import Link from "next/link"
import Button from "../Button"
import { useEffect, useState } from "react"
import SlicerCardImage from "../SlicerCardImage"
import { Slicer } from "@prisma/client"

type Props = {
  data: Slicer[]
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
      <div className="grid items-center justify-center grid-cols-1 gap-2 sm:gap-4 lg:gap-5 sm:grid-cols-3">
        {[...Array(iterator)].map((el, key) => {
          const id = Number(key)
          const { name, imageUrl } = data[id] || {
            name: `Slicer #${id}`,
            imageUrl: "",
          }
          const slicerLink = `/slicer/${id}`
          return (
            <div className="flex flex-col items-center my-6" key={key}>
              <SlicerCardImage
                href={slicerLink}
                name={name}
                imageUrl={imageUrl}
                size="w-full h-52 sm:h-32 md:h-40 lg:h-48"
              />
              <div className="w-full pt-5 pl-2 text-left sm:pt-4">
                <Link href={slicerLink}>
                  <a>
                    <p className="inline-block text-xl">{name}</p>
                  </a>
                </Link>
              </div>
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
          <Button label="Slice a new slicer" href="/slice" />
        </div>
      </div>
    </>
  )
}

export default SlicersGrid
