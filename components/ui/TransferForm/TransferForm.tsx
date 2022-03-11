import { useEffect, useState } from "react"
import { Button } from "@components/ui"
import { Message } from "@utils/handleMessage"
import { LogDescription } from "ethers/lib/utils"
import MessageBlock from "../MessageBlock"
import { mutate } from "swr"
import getLog from "@utils/getLog"
import { useAppContext } from "../context"
import getEthFromWei from "@utils/getEthFromWei"
import getUnreleasedData from "@utils/getUnreleasedData"
import TransferFormInputBlock from "../TransferFormInputBlock"
import TransferFormNotes from "../TransferFormNotes"

type Props = {
  account: string
  slicerId: string
  slicerAddress: string
  ownedSlices: number
  totalSlices: number
  minimumSlices: number
}

const TransferForm = ({
  account,
  slicerId,
  slicerAddress,
  ownedSlices,
  totalSlices,
  minimumSlices,
}: Props) => {
  const { connector } = useAppContext()

  const [unreleased, setUnreleased] = useState([])
  const [batchMode, setBatchMode] = useState(false)
  const [addresses, setAddresses] = useState([""])
  const [shares, setShares] = useState([0])
  const [totalShares, setTotalShares] = useState(0)

  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<Message>({
    message: "",
    messageStatus: "success",
  })
  const [logs, setLogs] = useState<LogDescription[]>()
  const eventLog = getLog(logs, "TransferSingle")

  const unreleasedEth = getEthFromWei(unreleased[0])

  const submit = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault()

    if (!batchMode) {
      const handleSubmit = (await import("@utils/handleSubmit")).default
      const TransferShares = (
        await import("@lib/handlers/chain/TransferShares")
      ).default

      const eventLog = await handleSubmit(
        TransferShares(
          connector,
          account,
          addresses[0],
          Number(slicerId),
          shares[0]
        ),
        setMessage,
        setLoading,
        setSuccess
      )
      setLogs(eventLog)
    } else {
      const cleanedAddresses = addresses.filter((el) => el != "")
      const cleanedShares = shares.filter((el) => el != 0)

      const handleSubmit = (await import("@utils/handleSubmit")).default
      const TransferSharesBatch = (
        await import("@lib/handlers/chain/TransferSharesBatch")
      ).default

      const eventLog = await handleSubmit(
        TransferSharesBatch(
          connector,
          account,
          Number(slicerId),
          cleanedAddresses,
          cleanedShares
        ),
        setMessage,
        setLoading,
        setSuccess
      )
      setLogs(eventLog)
    }
  }

  const reset = () => {
    mutate(`/api/account/${account}/slicers`)
    setAddresses([])
    setShares([])
    setSuccess(false)
  }

  useEffect(() => {
    if (account && slicerAddress && !success) {
      getUnreleasedData(account, [slicerAddress], setUnreleased)
    }
    return () => setUnreleased([])
  }, [slicerAddress, account, success])

  return (
    <div className="relative px-4 py-10 bg-white shadow-xl sm:px-10 rounded-2xl">
      {!success ? (
        <form onSubmit={submit}>
          <div className="space-y-6">
            <TransferFormInputBlock
              batchMode={batchMode}
              addresses={addresses}
              shares={shares}
              totalShares={totalShares}
              ownedSlices={ownedSlices}
              totalSlices={totalSlices}
              minimumSlices={minimumSlices}
              setAddresses={setAddresses}
              setShares={setShares}
              setTotalShares={setTotalShares}
            />
            <TransferFormNotes
              unreleasedEth={unreleasedEth}
              ownedSlices={ownedSlices}
              slicesToTransfer={totalShares}
              minimumSlices={minimumSlices}
            />
            <div>
              <div className="pt-3">
                <Button label="Transfer" loading={loading} type="submit" />
              </div>
              <div className="mt-8">
                <a
                  className="highlight"
                  onClick={() => setBatchMode(!batchMode)}
                >
                  {batchMode ? "Single transfer" : "Batch transfer"}
                </a>
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
