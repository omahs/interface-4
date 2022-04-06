import formatNumber from "@utils/formatNumber"

type Props = {
  unreleasedEth: number
  ownedSlices: number
  slicesToTransfer: number
  minimumSlices: number
  toRelease: boolean
}

const TransferFormNotes = ({
  unreleasedEth,
  ownedSlices,
  slicesToTransfer,
  minimumSlices,
  toRelease
}: Props) => {
  const transferEth =
    unreleasedEth && ownedSlices && slicesToTransfer != 0
      ? unreleasedEth * (slicesToTransfer / ownedSlices)
      : null
  return (
    <div className="pt-2 space-y-4">
      {unreleasedEth ? (
        toRelease ? (
          <p className="text-sm">
            You have an unreleased amount of <b>{unreleasedEth} ETH</b> which
            will be released during the transfer.
          </p>
        ) : (
          <p className="text-sm text-yellow-600">
            You have an unreleased amount of <b>{unreleasedEth} ETH</b>.{" "}
            {transferEth ? (
              <span>
                If you don&apos;t trigger the release you will be transferring{" "}
                <b>
                  {transferEth >= 0.001 ? transferEth.toFixed(3) : "~0"} ETH
                </b>{" "}
                to the receiver address.
              </span>
            ) : (
              "If you don't trigger the release you will be transferring ETH to the receiver address."
            )}
          </p>
        )
      ) : null}
      {minimumSlices != 0 &&
      ownedSlices > minimumSlices &&
      ownedSlices - slicesToTransfer < minimumSlices ? (
        <p className="text-sm text-yellow-600">
          You&apos;ll lose privileged access to the slicer, as you will not hold
          the minimum amount of slices (
          <span className="font-medium">{formatNumber(minimumSlices)}</span>
          ).
        </p>
      ) : null}
      {slicesToTransfer > ownedSlices ? (
        <p className="text-sm font-medium text-red-500">
          You are trying to transfer more slices than the ones you own (
          <b>{formatNumber(ownedSlices)}</b>).
        </p>
      ) : null}
    </div>
  )
}

export default TransferFormNotes
