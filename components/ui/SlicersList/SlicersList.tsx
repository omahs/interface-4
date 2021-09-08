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
  const slicersOwned = slicers?.filter((el) => el.slices != 0)
  const totalOwned = slicersOwned?.length
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
      slicersOwned?.map((slicer) => {
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
      <Spinner size="w-10 h-10" />
    </div>
  ) : totalOwned ? (
    <>
      {[...Array(iterator)].map((el, key) => {
        const i = Number(key)
        // Todo: Figure our how to fix 10 coming after 1 (comes from graphql query)
        // const sortedId = totalOwned - 1 - i
        const ownedShares = slicersOwned[i].slices
        const slicer = slicersOwned[i].slicer
        const slicerId = slicer.id
        const totalSlices = slicer.slices
        const slicerAddress = slicer.address
        const isCollectible = slicer.isCollectible
        const isAllowed = Number(ownedShares) >= Number(slicer.minimumSlices)
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
              shares={ownedShares}
              totalSlices={totalSlices}
              isAllowed={isAllowed}
              isCollectible={isCollectible}
              unreleasedAmount={unreleasedAmount}
            />
            {i + 1 != iterator && (
              <hr className="w-20 mx-auto my-16 border-gray-300" />
            )}
          </div>
        )
      })}
      <div className="pt-10 pb-6 space-y-8">
        {items < totalOwned && (
          <p className="text-center">
            <a
              className="underline"
              onClick={() => setItems(items + initItems)}
            >
              Load more
            </a>
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
