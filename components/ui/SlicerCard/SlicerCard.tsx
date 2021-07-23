import Link from "next/link"
import fetcher from "@utils/fetcher"
import useSWR from "swr"
import { useAllowed } from "@lib/useProvider"
import SlicerCardImage from "../SlicerCardImage"
import Chevron from "@components/icons/Chevron"
import { TriggerRelease } from "lib/handlers/chain"
import BlockchainCall from "../BlockchainCall"
import { useEffect, useState } from "react"
import { LogDescription } from "ethers/lib/utils"

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
  const { data: unreleasedData } = useSWR(
    `/api/slicer/${slicerId}/account/${account}/unreleased`,
    fetcher
  )
  const { name, address, imageUrl }: SlicerInfo = slicerInfo || {
    name: null,
    address: null,
    imageUrl: null,
  }
  const { unreleased } = unreleasedData || { unreleased: null }
  const unreleasedAmount = unreleased
    ? Math.floor((Number(unreleased?.hex) / Math.pow(10, 18)) * 10000) / 10000
    : null
  const slicerLink = `/slicer/${slicerId}`

  const [success, setSuccess] = useState(false)
  const [log, setLog] = useState<LogDescription>()
  const eventLog = log?.args

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
            <p className="text-sm">Shares owned: {shares}</p>
            <Link href={`slicer/${slicerId}/transfer`}>
              <a className="flex items-center ml-3 group">
                <p className="text-sm ">Transfer</p>
                <div className="w-6 h-6 transition-transform duration-150 rotate-180 group-hover:translate-x-1">
                  <Chevron />
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
              setLog={setLog}
              mutateUrl={`/api/slicer/${slicerId}/account/${account}/unreleased`}
            />
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default SlicerCard
