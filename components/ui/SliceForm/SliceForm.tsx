import { useEffect, useState } from "react"
import { Button, Input, SliceFormInputBlock } from "@components/ui"
import { Slice } from "@lib/handlers"
import handleSubmit from "@utils/handleSubmit"
import { initialize, useAddress } from "@lib/useProvider"

type Props = {}

const SliceForm = ({}: Props) => {
  const signerAddress = useAddress()
  const [inputCount, setInputCount] = useState(3)
  const [addresses, setAddresses] = useState([""])
  const [shares, setShares] = useState([1000000])
  const [minimumShares, setMinimumShares] = useState(0)
  const [totalShares, setTotalShares] = useState(1000000)
  const [loading, setLoading] = useState(false)
  const [{ message, messageStatus }, setMessage] = useState({
    message: "",
    messageStatus: "success",
  })

  useEffect(() => {
    if (signerAddress) {
      setAddresses([signerAddress])
      console.log(addresses)
    }
  }, [signerAddress])

  const submit = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault()
    const cleanedAddresses = addresses.filter(() => true)
    const cleanedShares = shares.filter(() => true)
    handleSubmit(
      Slice(cleanedAddresses, cleanedShares, minimumShares),
      e,
      setMessage,
      setLoading
    )
  }

  return (
    <form
      className="w-full max-w-screen-sm py-6 mx-auto space-y-4"
      onSubmit={submit}
    >
      <div className="grid grid-cols-12 text-left gap-x-4 gap-y-4">
        <p className="col-span-6 col-start-2 md:col-span-7 md:col-start-2">
          Address
        </p>
        <p className="col-span-4 md:col-span-3">Shares</p>
        {[...Array(inputCount)].map((el, key) => {
          const i = key
          return (
            <SliceFormInputBlock
              key={key}
              index={i}
              signerAddress={signerAddress}
              addresses={addresses}
              setAddresses={setAddresses}
              shares={shares}
              setShares={setShares}
              totalShares={totalShares}
              setTotalShares={setTotalShares}
              minimumShares={minimumShares}
            />
          )
        })}
        <p className="col-start-9">{totalShares}</p>
        <div className="col-span-3 col-start-9">
          <Input
            type="number"
            placeholder="100000"
            className="mt-1.5"
            required
            onChange={setMinimumShares}
          />
        </div>
        <div className="flex items-center mt-1.5">
          <p className="col-span-1 text-sm font-bold">
            {minimumShares != 0 &&
              Math.floor((minimumShares / totalShares) * 10000) / 100 + "%"}
          </p>
        </div>
      </div>

      <p>
        <b>Note</b>: minimum and total shares cannot be changed later.
      </p>
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
