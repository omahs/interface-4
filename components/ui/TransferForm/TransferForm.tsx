import { useState } from "react"
import { Button } from "@components/ui"
import handleSubmit from "@utils/handleSubmit"
import { Message } from "@utils/handleMessage"
import { LogDescription } from "ethers/lib/utils"
import TransferShares from "@lib/handlers/chain/TransferShares"
import Input from "../Input"
import MessageBlock from "../MessageBlock"
import { mutate } from "swr"
import useSWR from "swr"
import fetcher from "@utils/fetcher"
import InputAddress from "../InputAddress"
import getLog from "@utils/getLog"
import useQuery from "@utils/subgraphQuery"
import { useAppContext } from "../context"

type Props = {
  account: string
  slicerId: string
  ownedSlices: number
  totalSlices: number
  minimumSlices: number
}

const TransferForm = ({
  account,
  slicerId,
  ownedSlices,
  totalSlices,
  minimumSlices,
}: Props) => {
  const { connector } = useAppContext()
  const { data: unreleasedData } = useSWR(
    `/api/slicer/${slicerId}/account/${account}/unreleased`,
    fetcher
  )
  const { unreleased } = unreleasedData || { unreleased: null }
  const unreleasedAmount = unreleased
    ? Math.floor((Number(unreleased?.hex) / Math.pow(10, 18)) * 10000) / 10000
    : null

  const [address, setAddress] = useState("")
  const [shares, setShares] = useState<number>(0)

  const [success, setSuccess] = useState(false)
  const [logs, setLogs] = useState<LogDescription[]>()
  const eventLog = getLog(logs, "TransferSingle")

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<Message>({
    message: "",
    messageStatus: "success",
  })

  const submit = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault()
    const eventLog = await handleSubmit(
      TransferShares(connector, account, address, Number(slicerId), shares),
      setMessage,
      setLoading,
      setSuccess
    )
    setLogs(eventLog)
  }

  const reset = () => {
    mutate(`/api/account/${account}/slicers`)
    setAddress("")
    setShares(0)
    setSuccess(false)
  }

  return (
    <div className="relative px-4 py-10 bg-white shadow-xl sm:px-10 rounded-2xl">
      {!success ? (
        <form onSubmit={submit}>
          <div className="space-y-6">
            <div className="pb-1">
              <InputAddress
                label="Receiver address"
                address={address}
                onChange={setAddress}
                required
              />
            </div>
            <div className="mb-2">
              <Input
                type="number"
                label="Slices to transfer"
                placeholder={`Up to ${ownedSlices || "..."}`}
                required
                error={shares > ownedSlices}
                onChange={setShares}
              />
            </div>
            <div className="space-y-4">
              {minimumSlices != 0 &&
                ownedSlices > minimumSlices &&
                ownedSlices - shares < minimumSlices && (
                  <p className="text-sm">
                    <span className="font-medium">Note:</span> You&apos;ll lose
                    privileged access to the slicer, as you will not hold the
                    minimum amount of slices (
                    <span className="font-medium">{minimumSlices}</span>)
                  </p>
                )}
              {unreleased && Number(unreleased.hex) !== 0 && (
                <p className="text-sm">
                  <span className="font-medium">Note:</span> you have an
                  unreleased amount of {unreleasedAmount} ETH which will be
                  released during the transfer. Expect the transaction fee to be
                  higher.
                </p>
              )}
            </div>
            <div>
              <div className="pt-3">
                <Button
                  label="Transfer slices"
                  loading={loading}
                  type="submit"
                />
              </div>
              <div>
                <MessageBlock msg={message} />
              </div>
            </div>
          </div>
        </form>
      ) : (
        <>
          <p className="font-medium">Slices transferred successfully! 🍰</p>

          <div className="py-8">
            <Button label="Go to your slicers" href="/profile" />
          </div>
          <a className="highlight" onClick={() => reset()}>
            Make a new transfer
          </a>
        </>
      )}
    </div>
  )
}

export default TransferForm
