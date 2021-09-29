import Spinner from "@components/icons/Spinner"
import { PaySlicer, SponsorListItem } from "@components/ui"
import useQuery from "@utils/subgraphQuery"
import { BigNumber } from "ethers"
import { useEffect, useState } from "react"

type Sponsor = {
  address: string
  amount: number
}

type Props = {
  slicerId: string
  slicerAddress: string
  sponsorData: object
  editMode: boolean
}

const SlicerSponsors = ({
  slicerId,
  slicerAddress,
  sponsorData,
  editMode,
}: Props) => {
  const [sponsors, setSponsors] = useState<Sponsor[]>([])
  const [loading, setLoading] = useState(true)

  const tokensQuery = /* GraphQL */ `
  payeeSlicers (
    first: 11, 
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
    <div className="max-w-sm pt-4 pb-12 mx-auto text-center">
      {loading ? (
        <div className="flex justify-center py-2">
          <Spinner size="h-10 w-10" />
        </div>
      ) : (
        sponsors.length != 0 && (
          <>
            <h2 className="pb-12">Sponsors</h2>
            <ol className="space-y-5">
              {sponsors.map((sponsor, key) => {
                return (
                  <SponsorListItem
                    slicerId={slicerId}
                    sponsor={sponsor}
                    key={key}
                    sponsorLink={sponsorData[sponsor.address]}
                  />
                )
              })}
            </ol>
          </>
        )
      )}
      {!editMode && (
        <>
          <p className="py-10">
            Sponsor this slicer by sending ETH to its address
          </p>
          <PaySlicer slicerAddress={slicerAddress} />
        </>
      )}
    </div>
  )
}

export default SlicerSponsors

// Todo?:
//  - allow superusers to hide sponsorLinks in editMode
//  - make first sponsors bigger or more highlighted
