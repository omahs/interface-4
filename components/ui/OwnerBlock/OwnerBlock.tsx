import { TriggerRelease } from "@lib/handlers/chain"
import { ConnectButton, useAddRecentTransaction } from "@rainbow-me/rainbowkit"
import formatNumber from "@utils/formatNumber"
import { Message } from "@utils/handleMessage"
import { BigNumber, ethers } from "ethers"
import { LogDescription } from "ethers/lib/utils"
import { AddressAmount } from "pages/slicer/[id]"
import { Dispatch, SetStateAction, useState } from "react"
import { useSigner } from "wagmi"
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
  setUnreleased
}: Props) => {
  const addRecentTransaction = useAddRecentTransaction()
  const { data: signer } = useSigner()

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<Message>({
    message: "",
    messageStatus: "success"
  })
  const [success, setSuccess] = useState(false)
  const [logs, setLogs] = useState<LogDescription[]>()

  const submit = async (ownerAddress: string) => {
    const handleSubmit = (await import("@utils/handleSubmit")).default

    setLoading(true)
    const eventLog = await handleSubmit(
      TriggerRelease(
        signer,
        slicerId,
        ownerAddress,
        ethers.constants.AddressZero,
        true
      ),
      setMessage,
      setLoading,
      setSuccess,
      false,
      addRecentTransaction,
      `Release & withdraw ETH | Slicer #${slicerId}`
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
    <div className="flex items-center justify-between">
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
                <ConnectButton.Custom>
                  {({ account, openConnectModal }) => (
                    <a
                      onClick={
                        account ? () => submit(owner.address) : openConnectModal
                      }
                    >
                      Release{" "}
                      {unreleasedAmount == "0.00" ? "~0" : unreleasedAmount} Ξ
                    </a>
                  )}
                </ConnectButton.Custom>
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
    </div>
  )
}

export default OwnerBlock
