import { Dispatch, SetStateAction } from "react"
import handleMessage, { Message } from "./handleMessage"
import launchConfetti from "@utils/launchConfetti"
import handleLog from "@utils/handleLog"

const handleSubmit = async (
  action: Promise<any>,
  e: React.SyntheticEvent<EventTarget>,
  setMessage: Dispatch<SetStateAction<Message>>,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setSuccess: Dispatch<SetStateAction<boolean>>,
  confetti = false
) => {
  e.preventDefault()
  setMessage({ message: "", messageStatus: "success" })
  try {
    const [contract, call] = await action

    setLoading(true)
    const eventLog = await handleLog(contract, call)
    setLoading(false)

    setSuccess(true)
    if (confetti) {
      launchConfetti()
    }
    return eventLog
  } catch (err) {
    const message = err.data?.message
      ?.split("reverted with reason string '")[1]
      ?.slice(0, -1)
    handleMessage({ message, messageStatus: "error" }, setMessage)
  }
}

export default handleSubmit
