import { NewTransaction } from "@rainbow-me/rainbowkit/dist/transactions/transactionStore"
import { Dispatch, SetStateAction } from "react"
import { Message } from "./handleMessage"

const handleSubmit = async (
  action: Promise<any>,
  setMessage: Dispatch<SetStateAction<Message>>,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setSuccess: Dispatch<SetStateAction<boolean>>,
  confetti = false,
  addRecentTransaction: (transaction: NewTransaction) => void,
  transactionDescription: string
) => {
  const handleMessage = (await import("./handleMessage")).default
  const launchConfetti = (await import("./launchConfetti")).default
  const handleLog = (await import("./handleLog")).default

  setMessage({ message: "", messageStatus: "success" })
  try {
    setLoading(true)
    const [contract, call] = await action

    addRecentTransaction({
      hash: call.hash,
      description: transactionDescription
    })

    const eventLogs = await handleLog(contract, call)
    setLoading(false)

    setSuccess(true)
    if (confetti) {
      launchConfetti()
    }
    return eventLogs
  } catch (err) {
    setLoading(false)
    const message = err.data?.message
      ?.split("reverted with reason string '")[1]
      ?.slice(0, -1)
    handleMessage({ message, messageStatus: "error" }, setMessage)
  }
}

export default handleSubmit
