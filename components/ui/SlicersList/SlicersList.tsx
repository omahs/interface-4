import { SlicerCard } from "@components/ui"
import fetcher from "@utils/fetcher"
import { useAppContext } from "@components/ui/context"
import ActionScreen from "../ActionScreen"
import Button from "../Button"
import { useEffect, useState } from "react"
import Spinner from "@components/icons/Spinner"
import useQuery from "@utils/subgraphQuery"

const SlicersList = () => {
  const { account } = useAppContext()
  const [unreleased, setUnreleased] = useState([])

  const tokensQuery = /* GraphQL */ `
      payee(id: "${account.toLowerCase()}") {
        slicers {
          slices
          slicer {
            id
            address
            slices
            minimumSlices
            isCollectible
          }
        }
      }
    `
  let subgraphData = useQuery(tokensQuery, [account])
  const slicers = subgraphData?.payee?.slicers
  const totalOwned = slicers?.length
  let slicerAddresses = []

  const initItems = 4
  const [items, setItems] = useState(initItems)
  const [iterator, setIterator] = useState(0)

  const getUnreleasedData = async (data) => {
    const unreleasedData = await fetcher(
      `/api/account/${account}/unreleased`,
      data
    )
    setUnreleased(unreleasedData)
  }

  useEffect(() => {
    if (account && slicers) {
      slicers?.map((slicer) => {
        slicerAddresses.push(slicer.slicer.address)
      })
      const body = {
        method: "POST",
        body: JSON.stringify({ slicerAddresses }),
      }
      getUnreleasedData(body)
    }
    return () => setUnreleased([])
  }, [slicers, account])

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", () => {
        setItems(initItems)
        setIterator(items < totalOwned ? items : totalOwned)
      })
    }
  }, [])

  useEffect(() => {
    if (totalOwned) {
      setIterator(items < totalOwned ? items : totalOwned)
    }
  }, [totalOwned, items])

  return !subgraphData ? (
    <div className="flex justify-center pb-20">
      <Spinner size="w-12 h-12" />
    </div>
  ) : totalOwned !== 0 ? (
    <>
      {[...Array(iterator)].map((el, key) => {
        const i = Number(key)
        const slicerId = slicers[i].slicer.id
        const slicerShares = slicers[i].slices
        const totalSlices = slicers[i].slicer.slices
        const slicerAddress = slicers[i].slicer.address
        const isCollectible = slicers[i].slicer.isCollectible
        const isAllowed =
          Number(slicerShares) >= Number(slicers[i].slicer.minimumSlices)
        const unreleasedAmount = unreleased[i]
          ? Math.floor((Number(unreleased[i].hex) / Math.pow(10, 18)) * 10000) /
            10000
          : null
        return (
          <div className="mt-3" key={key}>
            <SlicerCard
              slicerAddress={slicerAddress}
              slicerId={slicerId}
              account={account}
              shares={slicerShares}
              totalSlices={totalSlices}
              isAllowed={isAllowed}
              isCollectible={isCollectible}
              unreleasedAmount={unreleasedAmount}
            />
            <hr className="my-12 border-gray-300" />
          </div>
        )
      })}
      <div className="py-4 space-y-8">
        {items < totalOwned && (
          <p className="text-center">
            <a onClick={() => setItems(items + initItems)}>Load more</a>
          </p>
        )}
        <div className="flex justify-center">
          <Button label="Create a new slicer" href="/slice" />
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
