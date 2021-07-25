import { useEffect, useState } from "react"
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

type Props = {
  account: string
  slicerId: number
  ownedShares: number
}

const TransferForm = ({ account, slicerId, ownedShares }: Props) => {
  const { data } = useSWR(`/api/slicer/${slicerId}/minimum_shares`, fetcher)
  const [address, setAddress] = useState("")
  const [shares, setShares] = useState<number>(0)

  const [success, setSuccess] = useState(false)
  const [logs, setLogs] = useState<LogDescription[]>()
  // const eventLog = getLog(logs, "")

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<Message>()
  const minimumShares = Number(data?.hex)

  const submit = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault()
    const eventLog = await handleSubmit(
      TransferShares(account, address, slicerId, shares),
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

  useEffect(() => {
    if (minimumShares) {
      console.log(minimumShares)
    }
  }, [minimumShares])

  return (
    <div className="relative px-4 py-10 bg-white shadow-xl sm:px-10 rounded-2xl">
      {!success ? (
        <form onSubmit={submit}>
          <div className="space-y-6">
            <div>
              <Input
                type="string"
                label="Receiver address"
                placeholder="0x... / vitalik.eth"
                required
                onChange={setAddress}
              />
            </div>
            <div>
              <Input
                type="number"
                label="Slices to transfer"
                placeholder={`Up to ${ownedShares}`}
                required
                error={shares > ownedShares}
                onChange={setShares}
              />
            </div>
            {data && minimumShares && ownedShares - shares < minimumShares && (
              <p className="pt-2 text-sm">
                <span className="font-medium">Note:</span> You&apos;ll lose
                privileged access to the slicer, as you will not hold the
                minimum amount of slices (
                <span className="font-medium">{minimumShares}</span>)
              </p>
            )}
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
