import { useState, Dispatch, SetStateAction } from "react"
import { Button } from "@components/ui"
import { Slice } from "@lib/handlers/chain"
import handleSubmit from "@utils/handleSubmit"
import handleMessage, { Message } from "@utils/handleMessage"
import { LogDescription } from "ethers/lib/utils"
import MessageBlock from "../MessageBlock"
import Input from "../Input"

type Props = {
  success: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
  setSuccess: Dispatch<SetStateAction<boolean>>
  setLogs: Dispatch<SetStateAction<LogDescription[]>>
}

const AddProductForm = ({
  success,
  setLoading,
  setSuccess,
  setLogs,
}: Props) => {
  const [addresses, setAddresses] = useState([""])
  const [shares, setShares] = useState([1000000])
  const [minimumShares, setMinimumShares] = useState(0)
  const [totalShares, setTotalShares] = useState(1000000)
  const [isCollectible, setIsCollectible] = useState(false)
  const [message, setMessage] = useState<Message>()

  const cleanedAddresses = addresses.filter(() => true)
  const cleanedShares = shares.filter(() => true)

  const submit = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault()
    try {
      if (
        cleanedShares.length == cleanedAddresses.length &&
        cleanedShares.length <= 30
      ) {
        const eventLogs = await handleSubmit(
          Slice(cleanedAddresses, cleanedShares, minimumShares, isCollectible),
          setMessage,
          setLoading,
          setSuccess,
          true
        )
        setLogs(eventLogs)
      } else {
        handleMessage(
          {
            message: "Inputs don't correspond, please try again",
            messageStatus: "error",
          },
          setMessage
        )
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <form
      className="w-full max-w-screen-sm py-6 mx-auto space-y-4"
      onSubmit={submit}
    >
      <div className="py-1">
        <Button label="Slice" type="submit" />
      </div>
      <div>
        <MessageBlock msg={message} />
      </div>
    </form>
  )
}

export default AddProductForm

// Todo: This page
