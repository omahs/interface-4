import { mutate } from "swr"
import { LogDescription } from "ethers/lib/utils"
import { Dispatch, SetStateAction, useState, useEffect } from "react"
import Button from "../Button"
import MessageBlock from "../MessageBlock"
import { Message } from "@utils/handleMessage"
import { useAddRecentTransaction } from "@rainbow-me/rainbowkit"

type Props = {
  label: string
  action: () => Promise<any>
  setSuccess: Dispatch<SetStateAction<boolean>>
  setLogs: Dispatch<SetStateAction<LogDescription[]>>
  success?: boolean
  transactionDescription: string
  mutateUrl?: string
  mutateObj?: object
  confetti?: boolean
  saEventName?: string
}

const BlockchainCall = ({
  label,
  action,
  success,
  setSuccess,
  setLogs,
  mutateUrl,
  mutateObj,
  transactionDescription,
  confetti = false,
  saEventName = ""
}: Props) => {
  const addRecentTransaction = useAddRecentTransaction()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<Message>({
    message: "",
    messageStatus: "success"
  })

  const submit = async () => {
    try {
      if (saEventName) {
        sa_event(saEventName + "_attempt")
      }
      const handleSubmit = (await import("@utils/handleSubmit")).default

      const eventLog = await handleSubmit(
        action(),
        setMessage,
        setLoading,
        setSuccess,
        confetti,
        addRecentTransaction,
        transactionDescription
      )
      setLogs(eventLog)
      if (saEventName) {
        sa_event(saEventName + "_success")
      }
    } catch (err) {
      if (saEventName) {
        sa_event(saEventName + "_fail")
      }
      console.log(err)
    }
  }

  useEffect(() => {
    if (mutateUrl && success) {
      mutate(mutateUrl, mutateObj, false)
      mutate(mutateUrl)
    }
  }, [success])

  return (
    <>
      <div className="py-1">
        <Button label={label} loading={loading} onClick={() => submit()} />
      </div>
      <div>
        <MessageBlock msg={message} />
      </div>
    </>
  )
}

export default BlockchainCall
