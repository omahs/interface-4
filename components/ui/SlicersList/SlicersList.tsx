import { SlicerCard } from "@components/ui"
import fetcher from "@utils/fetcher"
import useSWR, { mutate } from "swr"
import { useAppContext } from "@components/ui/context"
import ActionScreen from "../ActionScreen"
import Button from "../Button"
import { useEffect, useState } from "react"

const SlicersList = () => {
  const { account } = useAppContext()
  const { data } = useSWR(
    account ? `/api/account/${account}/slicers` : null,
    fetcher
  )
  const initItems = 4
  const [items, setItems] = useState(0)

  const handleIncrease = () => {
    if (items + initItems <= Number(data.totalOwned.hex)) {
      setItems(items + initItems)
    } else {
      setItems(Number(data.totalOwned.hex))
    }
  }

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
      setItems(
        Number(data.totalOwned.hex) < initItems
          ? Number(data.totalOwned.hex)
          : initItems
      )
    }
  }, [data])

  return (
    <>
      {data && Number(data.totalOwned.hex) ? (
        <>
          {[...Array(items)].map((el, key) => {
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
                <a onClick={() => handleIncrease()}>Load more</a>
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
      )}
    </>
  )
}

export default SlicersList

// Todo: Add sorting by unreleased amount
