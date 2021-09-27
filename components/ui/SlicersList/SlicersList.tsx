import { ListLayout, SlicerCard } from "@components/ui"
import fetcher from "@utils/fetcher"
import { useAppContext } from "@components/ui/context"
import { useEffect, useState } from "react"
import useQuery from "@utils/subgraphQuery"

const SlicersList = () => {
  const { account } = useAppContext()
  const [iterator, setIterator] = useState(0)
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
  let slicerAddresses = []

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

  return (
    <ListLayout
      elementsArray={slicersOwned}
      setIterator={setIterator}
      actionScreenText="You have no slicers :("
      actionScreenHref="/slice"
      actionScreenButtonLabel="Start slicing"
      endpageButtonLabel="Create a new slicer"
    >
      <>
        {[...Array(iterator)].map((el, key) => {
          const i = Number(key)
          const ownedShares = slicersOwned[i].slices
          const slicer = slicersOwned[i].slicer
          const slicerId = slicer.id
          const totalSlices = slicer.slices
          const slicerAddress = slicer.address
          const isCollectible = slicer.isCollectible
          const isAllowed = Number(ownedShares) >= Number(slicer.minimumSlices)
          const unreleasedAmount = unreleased[i]
            ? Math.floor(
                (Number(unreleased[i].hex) / Math.pow(10, 18)) * 10000
              ) / 10000
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
      </>
    </ListLayout>
  )
}

export default SlicersList

// Todo: Add sorting options, if possible also by unreleased amount
// Todo: Unrelease batch
