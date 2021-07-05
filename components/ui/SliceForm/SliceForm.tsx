import { useState } from "react"
import { Button, Input } from "@components/ui"
import { Slice } from "@lib/handlers"
import handleSubmit from "@utils/handleSubmit"

type Props = {}

const SliceForm = ({}: Props) => {
  const [address, setAddress] = useState("")
  const [shares, setShares] = useState(0)
  const [minimumShares, setMinimumShares] = useState(0)
  const [loading, setLoading] = useState(false)
  const [{ message, messageStatus }, setMessage] = useState({
    message: "",
    messageStatus: "success",
  })

  const submit = async (e: React.SyntheticEvent<EventTarget>) => {
    handleSubmit(
      Slice([address], [shares], minimumShares),
      e,
      setMessage,
      setLoading
    )
  }

  return (
    <form className="mx-auto py-6 w-[20rem] space-y-4" onSubmit={submit}>
      <div className="flex pt-4">
        <Input
          type="string"
          placeholder="Add an address"
          className="mt-1.5"
          required
          onChange={setAddress}
        />
        <Input
          type="number"
          placeholder="Add shares amount"
          className="mt-1.5"
          required
          onChange={setShares}
        />
      </div>
      <div>
        <Input
          type="number"
          placeholder="Add minimum shares amount"
          className="mt-1.5"
          required
          onChange={setMinimumShares}
        />
      </div>
      <div className="py-1">
        <Button label="Slice" type="submit" loading={loading} />
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
    </form>
  )
}

export default SliceForm
