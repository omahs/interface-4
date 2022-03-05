import Spinner from "@components/icons/Spinner"
import { PaySlicer, SponsorListItem } from "@components/ui"
import useQuery from "@utils/subgraphQuery"
import { BigNumber } from "ethers"
import { useEffect, useState } from "react"
import ListLayout from "../ListLayout"

type Sponsor = {
  address: string
  amount: number
}

type Props = {
  slicerId: string
  slicerAddress: string
  sponsorData: object
  editMode: boolean
  tag: string
}

const SlicerSponsors = ({
  slicerId,
  slicerAddress,
  sponsorData,
  editMode,
  tag,
}: Props) => {
  const [sponsors, setSponsors] = useState<Sponsor[]>([])
  const [loading, setLoading] = useState(true)
  const [iterator, setIterator] = useState(0)

  const tokensQuery = /* GraphQL */ `
  payeeSlicers (
    where: {slicer: "${slicerId}"}, 
    orderBy: "totalPaid", 
    orderDirection: "desc"
  ) {
    id
    totalPaid
  }`
  const subgraphData = useQuery(tokensQuery, [slicerAddress])

  useEffect(() => {
    if (subgraphData) {
      let sponsorList: Sponsor[] = []
      subgraphData.payeeSlicers.forEach((el) => {
        const address = el.id.split("-")[1]
        const totalPaid = el.totalPaid
        if (address != slicerAddress && totalPaid) {
          const amount = Number(
            BigNumber.from(totalPaid).div(BigNumber.from(10).pow(15))
          )
          sponsorList.push({ address, amount })
        }
      })
      setSponsors(sponsorList)
      setLoading(false)
    }
  }, [subgraphData])

  return (
    <div className="max-w-sm mx-auto">
      {loading ? (
        <>
          <div className="flex justify-center w-full pt-4 pb-12 text-center">
            <Spinner size="h-10 w-10" />
          </div>
          <hr className="w-20 mx-auto mt-16 mb-6 border-gray-300" />
        </>
      ) : (
        sponsors.length != 0 && (
          <>
            <div className="pt-8 text-center">
              <h2 className="pb-12">
                {tag === "Charity" ? "Donors" : "Sponsors"}
              </h2>
              <ListLayout
                elementsArray={sponsors}
                setIterator={setIterator}
                itemsIncrement={10}
              >
                <ul className="space-y-5">
                  {[...Array(iterator)].map((el, key) => {
                    const sponsor = sponsors[Number(key)]
                    return (
                      <SponsorListItem
                        slicerId={slicerId}
                        sponsor={sponsor}
                        key={key}
                        sponsorLink={sponsorData[sponsor.address]}
                      />
                    )
                  })}
                </ul>
              </ListLayout>
            </div>
            <hr className="w-20 mx-auto mt-6 mb-6 border-gray-300" />
          </>
        )
      )}
      {!editMode && (
        <div className="pt-4 pb-12 text-center">
          <p className="py-10">
            {tag === "Charity" ? "Donate to" : "Sponsor"} this slicer by sending
            ETH to its address
          </p>
          <PaySlicer slicerAddress={slicerAddress} />
        </div>
      )}
    </div>
  )
}

export default SlicerSponsors

// Todo?:
//  - allow superusers to hide sponsorLinks in editMode
//  - make first sponsors bigger or more highlighted
