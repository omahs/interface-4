import Spinner from "@components/icons/Spinner"
import { PaySlicer } from "@components/ui"
import resolveEns from "@utils/resolveEns"
import useQuery from "@utils/subgraphQuery"
import { BigNumber } from "ethers"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

type Sponsor = {
  address: string
  amount: number
}

type Props = {
  slicerId: string
  slicerAddress: string
  editMode: boolean
}

const SlicerSponsors = ({ slicerId, slicerAddress, editMode }: Props) => {
  const [sponsors, setSponsors] = useState<Sponsor[]>([])
  const [loading, setLoading] = useState(true)

  const tokensQuery = /* GraphQL */ `
  payeeSlicers (
    first: 11, 
    where: {slicer: "${slicerId}"}, 
    orderBy: "totalPaid", 
    orderDirection: "asc"
  ) {
    id
    totalPaid
  }`
  const subgraphData = useQuery(tokensQuery)
  const payeeSlicers = subgraphData?.payeeSlicers

  useEffect(() => {
    if (payeeSlicers) {
      let sponsorList: Sponsor[] = []
      payeeSlicers.forEach((el) => {
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
  }, [payeeSlicers])

  return (
    <div className="max-w-sm py-8 mx-auto text-center">
      <h2 className="pb-12">Sponsors</h2>
      {loading ? (
        <Spinner />
      ) : sponsors.length != 0 ? (
        <ol className="space-y-3">
          {sponsors.map((sponsor, key) => {
            const address = sponsor.address
            return (
              <li className="flex justify-between" key={key}>
                <span>
                  {address.replace(
                    address.substring(5, address.length - 3),
                    `\xa0\xa0\xa0\xa0\xa0\xa0`
                  )}
                </span>
                <span>Ξ {sponsor.amount / 1000}</span>
              </li>
            )
          })}
        </ol>
      ) : (
        <p>There are no sponsors yet</p>
      )}
      {!editMode && (
        <>
          <p className="py-12">
            Sponsor this slicer by sending ETH to its address
          </p>
          <PaySlicer slicerAddress={slicerAddress} />
        </>
      )}
    </div>
  )
}

export default SlicerSponsors

// Todo: finish styling
// Todo: Add ENS address
