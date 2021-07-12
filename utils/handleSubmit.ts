import { Dispatch, SetStateAction } from "react"
import handleMessage, { Message } from "./handleMessage"

const handleSubmit = async (
  action: Promise<any>,
  e: React.SyntheticEvent<EventTarget>,
  setMessage: Dispatch<SetStateAction<Message>>,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  e.preventDefault()
  setLoading(true)
  setMessage({ message: "", messageStatus: "success" })
  try {
    await action
    handleMessage({ message: "Success!", messageStatus: "success" }, setMessage)
  } catch (err) {
    // todo: solve Bignumber value error IN SLICEFORM
    // todo: test this
    console.log(err)
    // const message = err.data.message.split("error message '")[1].slice(0, -1)
    // handleMessage({ message, messageStatus: "error" }, setMessage)
  }

  setLoading(false)
}

export default handleSubmit
