import formatNumber from "@utils/formatNumber"

type Props = {
  unreleasedEth: number
  ownedSlices: number
  slicesToTransfer: number
  minimumSlices: number
}

const TransferFormNotes = ({
  unreleasedEth,
  ownedSlices,
  slicesToTransfer,
  minimumSlices,
}: Props) => {
  return (
    <div className="pt-2 space-y-4">
      {minimumSlices != 0 &&
      ownedSlices > minimumSlices &&
      ownedSlices - slicesToTransfer < minimumSlices ? (
        <p className="text-sm">
          <span className="font-medium">Note:</span> You&apos;ll lose privileged
          access to the slicer, as you will not hold the minimum amount of
          slices (
          <span className="font-medium">{formatNumber(minimumSlices)}</span>
          ).
        </p>
      ) : null}
      {unreleasedEth ? (
        <p className="text-sm">
          <span className="font-medium">Note:</span> you have an unreleased
          amount of <b>{unreleasedEth} ETH</b> which will be released during the
          transfer. Expect the transaction fee to be slightly higher.
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
