import Link from "next/link"
import fetcher from "@utils/fetcher"
import useSWR from "swr"
import { TriggerRelease } from "lib/handlers/chain"
import BlockchainCall from "../BlockchainCall"
import { useEffect, useState } from "react"
import { LogDescription } from "ethers/lib/utils"
import formatNumber from "@utils/formatNumber"
import getLog from "@utils/getLog"
import Arrow from "@components/icons/Arrow"
import { CardImage, CopyAddress } from ".."
import UserVerified from "@components/icons/UserVerified"
import { useAppContext } from "../context"
import Immutable from "@components/icons/Immutable"

type SlicerInfo = {
  name: string
  address: string
  image: string
}

type Props = {
  slicerId: number
  slicerAddress: string
  shares: number
  totalSlices: number
  account: string
  isAllowed: boolean
  isImmutable: boolean
  unreleasedAmount: number
}

const SlicerCard = ({
  slicerId,
  slicerAddress,
  account,
  shares,
  totalSlices,
  isAllowed,
  isImmutable,
  unreleasedAmount
}: Props) => {
  const { connector } = useAppContext()

  const hexId = Number(slicerId).toString(16)
  const { data: slicerInfo } = useSWR(
    `/api/slicer/${hexId}?stats=false`,
    fetcher
  )

  const { name, image }: SlicerInfo = slicerInfo || {
    name: null,
    image: null
  }

  const [ethReleased, setEthReleased] = useState(0)
  const [released, setReleased] = useState(false)
  const [success, setSuccess] = useState(false)
  const [logs, setLogs] = useState<LogDescription[]>()
  const slicerLink = `/slicer/${slicerId}`
  const slicerName = name || `Slicer #${slicerId}`
  const slicePercentage = `${Math.floor((shares / totalSlices) * 10000) / 100}%`

  useEffect(() => {
    if (success) {
      setEthReleased(unreleasedAmount)
      setReleased(true)
    }
  }, [success])

  return (
    <div className="sm:flex">
      <CardImage
        href={slicerLink}
        name={slicerName}
        topLeft={
          isImmutable && {
            title: "Immutable asset",
            content: (
              <Immutable className="py-2 text-indigo-600 w-[38px] h-[38px]" />
            ),
            padding: "px-4"
          }
        }
        topRight={
          isAllowed && {
            title: "Superowner",
            content: (
              <UserVerified className="text-green-500 py-2 w-[38px] h-[38px]" />
            ),
            padding: "px-4"
          }
        }
        bottomLeft={{
          className: "text-black",
          content: slicerAddress ? (
            <CopyAddress
              slicerAddress={slicerAddress}
              showIcon={false}
              position="left-0 bottom-[40px]"
            />
          ) : (
            <div className="w-24 h-4 rounded-md bg-sky-300 animate-pulse" />
          ),
          clickable: false
        }}
        bottomRight={{
          title: "Total slices",
          content: `${formatNumber(totalSlices)} 🍰`,
          className: "text-black text-sm font-medium"
        }}
        imageUrl={image}
      />
      <div className="pt-5 sm:pt-4 sm:ml-6 md:ml-14">
        <Link href={slicerLink}>
          <a className="flex items-center">
            {slicerInfo ? (
              <h3 className="inline-block">{slicerName}</h3>
            ) : (
              <div className="w-32 h-6 mb-2 rounded-md bg-sky-300 animate-pulse" />
            )}
            {name && name != `Slicer #${slicerId}` && (
              <p className="h-full ml-3 text-sm font-normal text-gray-500">
                #{slicerId}
              </p>
            )}
          </a>
        </Link>
        <div className="space-y-2 text-gray-700">
          <div className="flex items-center">
            <p className="text-sm">
              {formatNumber(shares, 3)} slices owned ({slicePercentage})
            </p>
            <Link href={`/transfer?id=${slicerId}`}>
              <a className="flex items-center ml-3 group">
                <p className="text-sm ">Transfer</p>
                <div className="w-5 h-5 ml-1 transition-transform duration-150 group-hover:translate-x-1">
                  <Arrow />
                </div>
              </a>
            </Link>
          </div>
        </div>
        {!released && unreleasedAmount ? (
          <div className="mt-2">
            <p className="mb-6 text-sm">
              Unreleased:{" "}
              <span className="font-medium text-black">
                {unreleasedAmount} ETH
              </span>
            </p>
            <BlockchainCall
              label="Trigger release"
              action={() => TriggerRelease(connector, account, slicerId)}
              success={success}
              setSuccess={setSuccess}
              setLogs={setLogs}
              mutateUrl={`/api/slicer/${slicerId}/account/${account}/unreleased`}
              mutateObj={{ unreleased: 0 }}
            />
          </div>
        ) : null}
        {ethReleased != 0 && (
          <p className="pt-4 text-sm text-green-500">
            You received <span className="font-medium">{ethReleased} ETH</span>!
            🎉
          </p>
        )}
      </div>
    </div>
  )
}

export default SlicerCard
