import Delete from "@components/icons/Delete"
import Edit from "@components/icons/Edit"
import { useEns } from "@utils/resolveEns"
import { useState } from "react"
import { Input } from ".."
import { useAppContext } from "../context"

type Sponsor = {
  address: string
  amount: number
}

type Props = {
  slicerId: string
  sponsor: Sponsor
  sponsorLink: string
}

const SponsorListItem = ({ slicerId, sponsor, sponsorLink }: Props) => {
  const { account, connector } = useAppContext()
  const { address, amount } = sponsor
  const [link, setLink] = useState("")
  const [loading, setLoading] = useState(false)
  const [editSponsor, setEditSponsor] = useState(false)
  const resolvedAddress = useEns(connector, address)
  const addressReduced = address.replace(
    address.substring(5, address.length - 3),
    "__"
  )

  const updateSponsor = async () => {
    const fetcher = (await import("@utils/fetcher")).default

    setLoading(true)
    const body = {
      method: "POST",
      body: JSON.stringify({
        address,
        link,
      }),
    }
    await fetcher(`/api/slicer/${slicerId}/sponsor`, body)
    if (!link.includes("://")) {
      setLink("https://" + link)
    }
    setLoading(false)
    setEditSponsor(false)
  }

  const handleReset = () => {
    setEditSponsor(false)
    setLink("")
  }

  return (
    <li className="flex justify-between">
      {editSponsor ? (
        <div className="flex items-center flex-grow">
          <a
            className="mt-8 mr-4 hover:text-red-500"
            onClick={() => handleReset()}
          >
            <Delete className="w-[22px] h-[22px]" />
          </a>
          <div className="flex-grow">
            <Input
              label="Sponsor link"
              placeholder={sponsorLink || "https://slice.so"}
              value={link}
              onChange={setLink}
              loading={loading}
              onClickLabel="Save"
              onClick={async () => await updateSponsor()}
              question={
                <>
                  <p>
                    You can add a link to redirect anyone clicking on your
                    address to a website.
                  </p>
                  <p>
                    <b>Note:</b> Make sure to prefix the link with
                    &quot;http://&quot; or &quot;https://&quot;
                  </p>
                </>
              }
            />
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center">
            <>
              <span className="mr-3">
                {link || sponsorLink ? (
                  <a
                    href={link || sponsorLink}
                    target="_blank"
                    rel="noreferrer"
                    className="higlight"
                  >
                    {resolvedAddress || addressReduced}
                  </a>
                ) : (
                  <>{resolvedAddress || addressReduced}</>
                )}
              </span>
              {account?.toLowerCase() === address && (
                <a onClick={() => setEditSponsor(true)}>
                  <Edit className="w-[18px] h-[18px]" />
                </a>
              )}
            </>
          </div>
          <span>Ξ {amount / 1000}</span>
        </>
      )}
    </li>
  )
}

export default SponsorListItem
