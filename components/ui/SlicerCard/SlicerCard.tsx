import Link from "next/link"
import fetcher from "@utils/fetcher"
import useSWR from "swr"
import { useAllowed } from "@lib/useProvider"
import SlicerCardImage from "../SlicerCardImage"
import { TriggerRelease } from "lib/handlers/chain"
import BlockchainCall from "../BlockchainCall"
import { useEffect, useState } from "react"
import { LogDescription } from "ethers/lib/utils"
import abbreviateNumber from "@utils/abbreviateNumber"
import getLog from "@utils/getLog"
import Arrow from "@components/icons/Arrow"

type SlicerInfo = {
  name: string
  address: string
  imageUrl: string
}

type Props = {
  slicerId: number
  shares: number
  account: string
}

const SlicerCard = ({ slicerId, shares, account }: Props) => {
  const isAllowed = useAllowed(slicerId)
  const { data: slicerInfo } = useSWR(`/api/slicer/${slicerId}`, fetcher)
  const { name, address, imageUrl }: SlicerInfo = slicerInfo || {
    name: null,
    address: null,
    imageUrl: null,
  }

  const { data: unreleasedData } = useSWR(
    `/api/slicer/${slicerId}/account/${account}/unreleased`,
    fetcher
  )
  const { unreleased } = unreleasedData || { unreleased: null }
  const unreleasedAmount = unreleased
    ? Math.floor((Number(unreleased?.hex) / Math.pow(10, 18)) * 10000) / 10000
    : null

  const [ethReleased, setEthReleased] = useState(0)
  const [success, setSuccess] = useState(false)
  const [logs, setLogs] = useState<LogDescription[]>()
  const eventLog = getLog(logs, "MintTriggered")
  const slicerLink = `/slicer/${slicerId}`

  const slcReleased =
    eventLog &&
    abbreviateNumber(
      Math.floor((Number(eventLog.amount._hex) / Math.pow(10, 18)) * 100) / 100,
      2
    )

  useEffect(() => {
    if (success) {
      setEthReleased(unreleasedAmount)
    }
  }, [success])

  return (
    <div className="sm:flex">
      <SlicerCardImage
        href={slicerLink}
        name={name}
        slicerAddress={address}
        imageUrl={imageUrl}
        isAllowed={isAllowed}
      />
      <div className="pt-5 sm:pt-4 sm:ml-6 md:ml-14">
        <Link href={slicerLink}>
          <a>
            <h3 className="inline-block">
              {name}
              <span className="mb-1 ml-2 text-base font-normal">
                #{slicerId}
              </span>
            </h3>
          </a>
        </Link>
        <div className="space-y-2 text-gray-700">
          <div className="flex items-center">
            <p className="text-sm">Slices owned: {shares}</p>
            <Link href={`slicer/${slicerId}/transfer`}>
              <a className="flex items-center ml-3 group">
                <p className="text-sm ">Transfer</p>
                <div className="w-5 h-5 ml-1 transition-transform duration-150 group-hover:translate-x-1">
                  <Arrow />
                </div>
              </a>
            </Link>
          </div>
          <p className="text-sm">
            Unreleased:{" "}
            <span className="font-medium text-black">
              {unreleasedAmount} ETH
            </span>
          </p>
        </div>
        {unreleasedAmount ? (
          <div className="mt-6">
            <BlockchainCall
              label="Trigger release"
              action={() => TriggerRelease(account, [address], 0)}
              success={success}
              setSuccess={setSuccess}
              setLogs={setLogs}
              mutateUrl={`/api/slicer/${slicerId}/account/${account}/unreleased`}
              mutateObj={{ unreleased: 0 }}
            />
          </div>
        ) : null}
        {slcReleased && (
          <p className="pt-4 text-sm text-green-500">
            You received <span className="font-medium">{ethReleased} ETH</span>{" "}
            and <span className="font-medium">{slcReleased} SLC!</span> 🎉
          </p>
        )}
      </div>
    </div>
  )
}

export default SlicerCard
