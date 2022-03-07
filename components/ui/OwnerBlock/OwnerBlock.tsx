import { TriggerRelease } from "@lib/handlers/chain"
import formatNumber from "@utils/formatNumber"
import { Message } from "@utils/handleMessage"
import { BigNumber } from "ethers"
import { LogDescription } from "ethers/lib/utils"
import { AddressAmount } from "pages/slicer/[id]"
import { Dispatch, SetStateAction, useState } from "react"
import { useAppContext } from "../context"
import ResolvedAddress from "../ResolvedAddress"

type Props = {
  index: number
  slicerId: number
  totalSlices: number
  owner: AddressAmount
  unreleasedOwner: number
  unreleased: number[]
  setUnreleased: Dispatch<SetStateAction<number[]>>
}

const OwnerBlock = ({
  index,
  slicerId,
  totalSlices,
  owner,
  unreleasedOwner,
  unreleased,
  setUnreleased,
}: Props) => {
  const { connector, isConnected, setModalView } = useAppContext()

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<Message>({
    message: "",
    messageStatus: "success",
  })
  const [success, setSuccess] = useState(false)
  const [logs, setLogs] = useState<LogDescription[]>()

  const submit = async (ownerAddress: string) => {
    const handleSubmit = (await import("@utils/handleSubmit")).default

    const eventLog = await handleSubmit(
      TriggerRelease(connector, ownerAddress, slicerId),
      setMessage,
      setLoading,
      setSuccess
    )
    setLogs(eventLog)

    const newUnreleased = unreleased
    newUnreleased[index] = 0
    setUnreleased(newUnreleased)
  }

  const unreleasedAmount =
    unreleasedOwner && unreleasedOwner != 0
      ? (Number(BigNumber.from(unreleasedOwner)) / 10 ** 18).toFixed(2)
      : null

  return (
    <li className="flex items-center justify-between">
      <p className="truncate">
        <ResolvedAddress address={owner.address} />
      </p>
      <div className="text-right min-w-[150px]">
        <p>
          <b className="pr-1">{formatNumber(owner.amount)}</b>{" "}
          <span className="text-sm">
            ({((owner.amount / totalSlices) * 100).toFixed(1)}%)
          </span>
        </p>

        {!success ? (
          unreleasedAmount ? (
            <p className="text-sm font-medium text-gray-400">
              {!loading ? (
                <a
                  onClick={() =>
                    isConnected
                      ? submit(owner.address)
                      : setModalView({
                          name: "CONNECT_VIEW",
                          cross: true,
                        })
                  }
                >
                  Release {unreleasedAmount == "0.00" ? "~0" : unreleasedAmount}{" "}
                  Ξ
                </a>
              ) : (
                "Releasing..."
              )}
            </p>
          ) : null
        ) : (
          <p className="text-sm font-medium text-gray-400">
            Released {unreleasedAmount} Ξ! 🎉
          </p>
        )}
      </div>
    </li>
  )
}

export default OwnerBlock
