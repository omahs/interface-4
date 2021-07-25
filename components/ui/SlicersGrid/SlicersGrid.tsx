import Link from "next/link"
import fetcher from "@utils/fetcher"
import useSWR from "swr"
import ActionScreen from "../ActionScreen"
import Button from "../Button"
import { useEffect, useState } from "react"
import SlicerImage from "../SlicerImage"
import SlicerCardImage from "../SlicerCardImage"

type Props = {
  totalSlicers: number
}

const SlicersGrid = ({ totalSlicers }: Props) => {
  const initItems = 12
  const [items, setItems] = useState(initItems)
  const [iterator, setIterator] = useState(0)

  const { data } = useSWR(`/api/slicer?items=${iterator || initItems}`, fetcher)

  useEffect(() => {
    setIterator(items < totalSlicers ? items : totalSlicers)
  }, [items])

  return data ? (
    <>
      <div className="grid items-center justify-center grid-cols-1 gap-2 sm:gap-4 lg:gap-5 sm:grid-cols-3">
        {[...Array(iterator)].map((el, key) => {
          const i = Number(key)
          const { id, name, imageUrl } = data[i]
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
  ) : (
    <ActionScreen
      text="There are no slicers"
      buttonLabel="Start slicing"
      href="/slice"
    />
  )
}

export default SlicersGrid

// Todo: Prevent flash on load more
