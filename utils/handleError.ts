// import { SetStateAction } from "react"

const handleError = (message: string, setMessage: any) => {
  setMessage(message)
  setTimeout(() => {
    setMessage("")
  }, 5000)
}

export default handleError
