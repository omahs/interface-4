import { PaySlicer, SponsorListItem } from "@components/ui"
import { AddressAmount } from "pages/slicer/[id]"
import { useState } from "react"
import ListLayout from "../ListLayout"

type Props = {
  sponsors: AddressAmount[]
  slicerId: string
  slicerAddress: string
  sponsorData: object
  editMode: boolean
  tag: string
}

const SlicerSponsors = ({
  slicerId,
  sponsorData,
  sponsors,
  slicerAddress,
  editMode,
  tag
}: Props) => {
  const [iterator, setIterator] = useState(0)

  return (
    <div className="max-w-sm mx-auto">
      {sponsors && sponsors.length != 0 && (
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
      )}
      {!editMode && (
        <div className="pt-4 pb-12 text-center">
          <div className="py-10">
            <p>
              {tag === "Charity" ? "Donate to" : "Sponsor"} this slicer by
              sending ETH to its address
            </p>
            {process.env.NEXT_PUBLIC_CHAIN_ID != "1" && (
              <p className="pt-2 font-semibold text-yellow-600">
                Note: sponsors are not displayed on testnet
              </p>
            )}
          </div>
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
