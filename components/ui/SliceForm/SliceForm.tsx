import { useState, Dispatch, SetStateAction } from "react"
import { Button, SliceFormBlockSplitter } from "@components/ui"
import { Message } from "@utils/handleMessage"
import { LogDescription } from "ethers/lib/utils"
import MessageBlock from "../MessageBlock"
import { useAppContext } from "../context"
import formatNumber from "@utils/formatNumber"

type Props = {
  success: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
  setSuccess: Dispatch<SetStateAction<boolean>>
  setLogs: Dispatch<SetStateAction<LogDescription[]>>
}

const SliceForm = ({ success, setLoading, setSuccess, setLogs }: Props) => {
  const { connector } = useAppContext()
  const [addresses, setAddresses] = useState([""])
  const [shares, setShares] = useState([1000000])
  const [minimumShares, setMinimumShares] = useState(0)
  const [totalShares, setTotalShares] = useState(1000000)
  const [isImmutable, setisImmutable] = useState(false)
  const [message, setMessage] = useState<Message>({
    message: "",
    messageStatus: "success"
  })

  const hasMinimumShares =
    shares.filter((share) => share >= minimumShares).length > 0

  const submit = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault()

    const handleSubmit = (await import("@utils/handleSubmit")).default
    const handleMessage = (await import("@utils/handleMessage")).default
    const { Slice } = await import("@lib/handlers/chain")

    const cleanedAddresses = addresses.filter((el) => el != "")
    const cleanedShares = shares.filter((el) => el != 0)

    const payees = []
    for (let i = 0; i < cleanedAddresses.length; i++) {
      const account = cleanedAddresses[i]
      const shares = cleanedShares[i]

      payees.push({ account, shares })
    }

    try {
      if (cleanedShares.length == cleanedAddresses.length) {
        const eventLogs = await handleSubmit(
          Slice(connector, payees, minimumShares, [], 0, 0, isImmutable, false),
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
            messageStatus: "error"
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
      <SliceFormBlockSplitter
        success={success}
        addresses={addresses}
        shares={shares}
        minimumShares={minimumShares}
        totalShares={totalShares}
        isImmutable={isImmutable}
        setAddresses={setAddresses}
        setShares={setShares}
        setMinimumShares={setMinimumShares}
        setTotalShares={setTotalShares}
        setisImmutable={setisImmutable}
        hasMinimumShares={hasMinimumShares}
      />
      <div className="py-8">
        {totalShares > 1000000000 && (
          <p className="pt-4 text-red-500">
            <strong>Note:</strong> You can create slicers with up to 1 Billion
            total slices.
          </p>
        )}
        {minimumShares ? (
          minimumShares > 0 ? (
            <p className="pt-4">
              <strong>Note:</strong> This slicer allows up to{" "}
              <b>
                {totalShares / minimumShares > 1000
                  ? `about ${formatNumber(totalShares / minimumShares)}`
                  : `${totalShares / minimumShares}`.split(".")[0]}
              </b>{" "}
              superowners at the same time.
            </p>
          ) : null
        ) : null}
        <p className="pt-4">
          <strong>Note:</strong> minimum and total slices cannot be changed
          later.
        </p>
        {totalShares === 1 && (
          <p className="pt-4">
            <strong>Note:</strong> You are about to create a non-fractionalized
            Slicer. That means that there can only be a single owner at any
            given time which gets all ETH earned by the slicer.
          </p>
        )}
        {minimumShares != 0 && totalShares == minimumShares && (
          <p className="pt-4">
            <strong>Note:</strong> A user would need to own all of the slices to
            operate this slicer. Superowner slices cannot be changed later, so
            make sure this is the desired behaviour or reduce them accordingly
            to your needs.
          </p>
        )}
        {process.env.NEXT_PUBLIC_CHAIN_ID === "4" && (
          <p className="pt-4">
            <strong>Note:</strong> This version of Slice runs on Rinkeby
            Testnet, so it does not use real ETH. You can get some ETH on
            Rinkeby{" "}
            <a
              href="https://rinkebyfaucet.com/"
              target="_blank"
              rel="noreferrer"
              className="font-black highlight"
            >
              here
            </a>
            .
          </p>
        )}
      </div>
      <div className="py-1">
        <Button label="Slice" type="submit" />
      </div>
      <div>
        <MessageBlock msg={message} />
      </div>
    </form>
  )
}

export default SliceForm
