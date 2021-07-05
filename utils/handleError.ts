import { Dispatch, SetStateAction } from "react"

const handleError = (
  message: string,
  setMessage: Dispatch<SetStateAction<string>>
) => {
  setMessage(message)
  setTimeout(() => {
    setMessage("")
  }, 5000)
}

export default handleError
