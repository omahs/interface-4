import Link from "next/link"
import { useEffect, useState, Dispatch, SetStateAction } from "react"
import { Button, Input, SliceFormInputBlock, Question } from "@components/ui"
import { Slice } from "@lib/handlers"
import handleSubmit from "@utils/handleSubmit"
import { useAddress } from "@lib/useProvider"
import handleMessage from "@utils/handleMessage"
import Add from "@components/icons/Add"
import { LogDescription } from "ethers/lib/utils"

type Props = {
  setLoading: Dispatch<SetStateAction<boolean>>
  setSuccess: Dispatch<SetStateAction<boolean>>
  setLog: Dispatch<SetStateAction<LogDescription>>
}

const SliceForm = ({ setLoading, setSuccess, setLog }: Props) => {
  const signerAddress = useAddress()
  const [inputCount, setInputCount] = useState(3)
  const [removedCount, setRemovedCount] = useState(0)
  const [addresses, setAddresses] = useState([""])
  const [shares, setShares] = useState([1000000])
  const [minimumShares, setMinimumShares] = useState(0)
  const [totalShares, setTotalShares] = useState(1000000)
  const [{ message, messageStatus }, setMessage] = useState({
    message: "",
    messageStatus: "success",
  })
  const cleanedAddresses = addresses.filter(() => true)
  const cleanedShares = shares.filter(() => true)

  useEffect(() => {
    if (signerAddress) {
      setAddresses([signerAddress])
    }
  }, [signerAddress])

  const resetInputs = () => {
    setInputCount(3)
    setRemovedCount(0)
    setAddresses([signerAddress])
    setShares([1000000])
    setMinimumShares(0)
    setTotalShares(1000000)
  }

  const submit = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault()
    if (
      cleanedShares.length == cleanedAddresses.length &&
      cleanedShares.length <= 30
    ) {
      const eventLog = await handleSubmit(
        Slice(cleanedAddresses, cleanedShares, minimumShares),
        e,
        setMessage,
        setLoading,
        setSuccess,
        true
      )
      resetInputs()
      setLog(eventLog)
    } else {
      handleMessage(
        {
          message: "Inputs don't correspond, please try again",
          messageStatus: "error",
        },
        setMessage
      )
    }
  }

  return (
    <form
      className="w-full max-w-screen-sm py-6 mx-auto space-y-4"
      onSubmit={submit}
    >
      <div className="grid items-center grid-cols-8 text-left xs:grid-cols-10 md:grid-cols-12 gap-x-4 gap-y-4 xs:gap-y-6">
        <p className="mb-[-16px] hidden xs:block xs:col-span-5 xs:col-start-2 md:col-span-7 md:col-start-2">
          Addresses <span className="text-sm">(Max. 30)</span>
        </p>
        <div className="mb-[-16px] relative items-center hidden xs:flex">
          <p className="pr-1">Shares</p>
          <Question
            text={
              <>
                <p className="pb-4">
                  The percentage represents the relative amount of ETH earned by
                  the account from all payments made to the slicer.
                </p>
                <p>
                  If it&apos;s green, the account possess more than the minimum
                  shares amount.
                </p>
              </>
            }
            position="top-[35px] right-[-35px]"
          />
        </div>
        <p className="col-span-8 pb-2 text-lg font-semibold text-center xs:hidden">
          Add up to 30 addresses
        </p>
        {[...Array(inputCount)].map((el, key) => {
          const i = key
          return (
            <SliceFormInputBlock
              key={key}
              index={i}
              signerAddress={signerAddress}
              addresses={addresses}
              shares={shares}
              totalShares={totalShares}
              minimumShares={minimumShares}
              removedCount={removedCount}
              setAddresses={setAddresses}
              setShares={setShares}
              setTotalShares={setTotalShares}
              setRemovedCount={setRemovedCount}
            />
          )
        })}
        <div className="col-span-1 col-start-1 mx-auto">
          {inputCount - removedCount < 30 && (
            <Add onClick={() => setInputCount(inputCount + 1)} />
          )}
        </div>
        <p className="col-span-4 py-3 pr-2 text-right xs:col-span-3 xs:col-end-7 md:col-end-9 md:col-span-3">
          Total shares
        </p>
        <p className="col-span-3 pl-5">{totalShares}</p>
        <div className="relative flex justify-end items-center col-span-5 xs:col-end-7 pt-1.5">
          <p className="pr-1">Minimum shares</p>
          <Question
            text={
              <>
                <p className="pb-4">
                  Accounts with the chosen amount of shares have{" "}
                  <Link href="/">
                    <a className="font-extrabold highlight">
                      privileged access
                    </a>
                  </Link>{" "}
                  to this slicer.
                </p>
                <p>
                  <strong>Note</strong>: At least one account has to hold the
                  minimum amount of shares.
                </p>
              </>
            }
          />
        </div>

        <div className="col-span-3 xs:col-span-3 xs:col-start-7 md:col-span-3 md:col-start-8">
          <Input
            type="number"
            placeholder="100000"
            className="mt-1.5"
            required
            onChange={setMinimumShares}
          />
        </div>
        <div className="col-start-6 pl-5 xs:pl-0 xs:col-span-1 flex items-center mt-1.5">
          <p
            className={`text-sm font-bold ${
              minimumShares > totalShares && "text-red-500"
            }`}
          >
            {minimumShares != 0 &&
              totalShares != 0 &&
              Math.floor((minimumShares / totalShares) * 10000) / 100 + "%"}
          </p>
        </div>
      </div>

      <div className="pt-4 pb-6">
        <p>
          <strong>Note</strong>: minimum and total shares cannot be changed
          later.
        </p>
        {totalShares === 1 && (
          <p className="pt-4">
            <strong>Note</strong>: You are about to create a non-fractionable
            Slicer. That means that there can only be a single owner at any
            given time which gets all ETH earned by the slicer.
          </p>
        )}
      </div>
      <div className="py-1">
        <Button label="Slice" type="submit" />
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
