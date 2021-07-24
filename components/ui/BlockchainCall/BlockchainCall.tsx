import { mutate } from "swr"
import handleSubmit from "@utils/handleSubmit"
import { LogDescription } from "ethers/lib/utils"
import { Dispatch, SetStateAction, useState, useEffect } from "react"
import Button from "../Button"

type Props = {
  label: string
  success: boolean
  action: () => Promise<any>
  setSuccess: Dispatch<SetStateAction<boolean>>
  setLogs: Dispatch<SetStateAction<LogDescription[]>>
  mutateUrl?: string
  confetti?: boolean
}

const BlockchainCall = ({
  label,
  action,
  success,
  setSuccess,
  setLogs,
  mutateUrl,
  confetti = false,
}: Props) => {
  const [loading, setLoading] = useState(false)
  const [{ message, messageStatus }, setMessage] = useState({
    message: "",
    messageStatus: "success",
  })

  const submit = async () => {
    const eventLog = await handleSubmit(
      action(),
      setMessage,
      setLoading,
      setSuccess,
      confetti
    )
    setLogs(eventLog)
  }

  useEffect(() => {
    if (mutateUrl && success) {
      mutate(mutateUrl, { unreleased: 0 }, false)
      mutate(mutateUrl)
    }
  }, [success])

  return (
    <>
      <div className="py-1">
        <Button label={label} loading={loading} onClick={() => submit()} />
      </div>
      {message && (
        <p
          className={
            messageStatus === "error" ? "text-red-500" : "text-green-600"
          }
        >
          {message}
        </p>
      )}
    </>
  )
}

export default BlockchainCall
