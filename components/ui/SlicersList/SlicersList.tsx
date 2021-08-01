import { SlicerCard } from "@components/ui"
import fetcher from "@utils/fetcher"
import useSWR, { mutate } from "swr"
import { useAppContext } from "@components/ui/context"
import ActionScreen from "../ActionScreen"
import Button from "../Button"
import { useEffect, useState } from "react"
import Spinner from "@components/icons/Spinner"

const SlicersList = () => {
  const { account } = useAppContext()
  const { data } = useSWR(
    account ? `/api/account/${account}/slicers` : null,
    fetcher
  )
  const initItems = 4
  const [items, setItems] = useState(initItems)
  const [iterator, setIterator] = useState(0)

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", () => {
        setItems(0)
        mutate(`/api/account/${account}/slicers`)
      })
    }
  }, [])

  useEffect(() => {
    if (data) {
      setIterator(
        items < Number(data.totalOwned.hex)
          ? items
          : Number(data.totalOwned.hex)
      )
    }
  }, [data, items])

  return !data ? (
    <div className="flex justify-center pb-20">
      <Spinner size="w-12 h-12" />
    </div>
  ) : Number(data.totalOwned.hex) !== 0 ? (
    <>
      {[...Array(iterator)].map((el, key) => {
        const i = Number(key)
        const slicerId = Number(data?.idsUint[i].hex)
        const slicerShares = Number(data?.shares[i].hex)
        return (
          <div className="mt-3" key={key}>
            <SlicerCard
              slicerId={slicerId}
              shares={slicerShares}
              account={account}
            />
            <hr className="my-12 border-gray-300" />
          </div>
        )
      })}
      <div className="py-4 space-y-8">
        {items < Number(data.totalOwned.hex) && (
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
      text="You have no slicers :("
      buttonLabel="Start slicing"
      href="/slice"
    />
  )
}

export default SlicersList

// Todo: Add sorting by unreleased amount
