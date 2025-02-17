import { useState, Dispatch, SetStateAction } from "react"
import {
  Button,
  FAQsItem,
  NoteText,
  SliceFormBlockSplitter
} from "@components/ui"
import { Message } from "@utils/handleMessage"
import { LogDescription } from "ethers/lib/utils"
import MessageBlock from "../MessageBlock"
import { useAppContext } from "../context"
import getLog from "@utils/getLog"
import decimalToHex from "@utils/decimalToHex"
import { Contract, ContractTransaction } from "ethers"
import PieChart from "../PieChart"
import SliceFormDescription from "../SliceFormDescription"
import formatNumber from "@utils/formatNumber"
import { ConnectButton, useAddRecentTransaction } from "@rainbow-me/rainbowkit"
import { useSigner } from "wagmi"
import saEvent from "@utils/saEvent"
import { Payee } from "@lib/handlers/chain/Slice/Slice"

type Props = {
  success: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
  setSuccess: Dispatch<SetStateAction<boolean>>
  setLogs: Dispatch<SetStateAction<LogDescription[]>>
}

const SliceForm = ({ success, setLoading, setSuccess, setLogs }: Props) => {
  const { account: creator } = useAppContext()
  const addRecentTransaction = useAddRecentTransaction()
  const [addresses, setAddresses] = useState([""])
  const [shares, setShares] = useState([1000000])
  const [minimumShares, setMinimumShares] = useState(1000000)
  const [totalShares, setTotalShares] = useState(1000000)
  const [isImmutable, setIsImmutable] = useState(false)
  const [isCreatorMetadata, setIsCreatorMetadata] = useState(false)
  const [message, setMessage] = useState<Message>({
    message: "",
    messageStatus: "success"
  })
  const [loadingButton, setloadingButton] = useState(false)
  const { data: signer } = useSigner()

  const allowedSuperOwners =
    totalShares / minimumShares > 1000
      ? `${formatNumber(totalShares / minimumShares)}`
      : `${totalShares / minimumShares}`.split(".")[0]

  const submit = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault()

    saEvent("create_slicer_attempt")
    const fetcher = (await import("@utils/fetcher")).default
    const handleMessage = (await import("@utils/handleMessage")).default
    const launchConfetti = (await import("@utils/launchConfetti")).default
    const handleLog = (await import("@utils/handleLog")).default
    const { Slice } = await import("@lib/handlers/chain")

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL
    const cleanedAddresses = addresses.filter((el) => el != "")
    const cleanedShares = shares.filter((el) => el != 0)

    setloadingButton(true)

    try {
      if (cleanedShares.length == cleanedAddresses.length) {
        const payees = cleanedAddresses.map((account, i) => ({
          account,
          shares: cleanedShares[i],
          transfersAllowedWhileLocked: false
        }))

        const [contract, call] = (await Slice(
          signer,
          payees,
          minimumShares,
          [],
          0,
          0,
          isImmutable
        )) as [Contract, ContractTransaction]

        setLoading(true)
        addRecentTransaction({ hash: call.hash, description: "Create slicer" })

        const eventLogs = await handleLog(contract, call)
        const eventLog = getLog(eventLogs, "TokenSliced")
        const slicerId = eventLog?.tokenId
        const slicerAddress = eventLog?.slicerAddress
        const hexId = decimalToHex(Number(slicerId))

        const body = {
          body: JSON.stringify({
            slicerAddress,
            isImmutable,
            isCreatorMetadata,
            totalShares,
            minimumShares,
            creator
          }),
          method: "POST"
        }
        await fetcher(`${baseUrl}/api/slicer/${hexId}/create`, body)
        setLogs(eventLogs)
        launchConfetti()
        saEvent("create_slicer_success")
        setSuccess(true)
        setLoading(false)
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
      saEvent("create_slicer_fail")
      setloadingButton(false)
      console.log(err)
    }
  }

  return (
    <form className="md:flex" onSubmit={submit}>
      <div className="w-full max-w-screen-sm py-6 mx-auto space-y-4 md:flex-grow md:w-3/5">
        <SliceFormDescription />
        <SliceFormBlockSplitter
          success={success}
          addresses={addresses}
          shares={shares}
          minimumShares={minimumShares}
          totalShares={totalShares}
          isImmutable={isImmutable}
          isCreatorMetadata={isCreatorMetadata}
          setAddresses={setAddresses}
          setShares={setShares}
          setMinimumShares={setMinimumShares}
          setTotalShares={setTotalShares}
          setIsImmutable={setIsImmutable}
          setIsCreatorMetadata={setIsCreatorMetadata}
        />
        <div className="py-12 space-y-4 text-yellow-600 sm:px-3">
          {totalShares > 4000000000 && (
            <NoteText
              error
              text="Slicers can have up to 4 Billion slices in total"
            />
          )}
          {totalShares === 1 && (
            <NoteText text="you are about to create a non-fractionalized Slicer. That means that there can only be a single owner at any given time" />
          )}
          {/* {minimumShares != 0 && totalShares == minimumShares && (
            <NoteText text="Only someone who holds all of the slices can add products or change the metadata of this slicer. Superowner slices cannot be changed later, so make sure this is the desired behaviour" />
          )} */}
          <NoteText
            text="Superowner slices and total slices cannot be
              changed later"
          />
          {process.env.NEXT_PUBLIC_CHAIN_ID === "5" && (
            <NoteText
              text={
                <>
                  You can get Goerli ETH from the{" "}
                  <a
                    href="https://faucet.paradigm.xyz/"
                    target="_blank"
                    rel="noreferrer"
                    className="underline"
                  >
                    Paradigm
                  </a>{" "}
                  or{" "}
                  <a
                    href="https://goerlifaucet.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="underline"
                  >
                    Alchemy
                  </a>{" "}
                  faucets
                </>
              }
            />
          )}
        </div>
        <div>
          <MessageBlock msg={message} />
        </div>
      </div>
      <div className="justify-center md:h-[700px] md:flex md:flex-col md:w-2/5 md:sticky md:top-0 md:-mt-12">
        <div>
          <PieChart
            addresses={addresses}
            shares={shares}
            minimumShares={minimumShares}
            totalShares={totalShares}
          />
          <div className="pt-8 mx-auto">
            <div className="space-y-3 text-center">
              <div>
                <p className="pb-1 text-lg font-bold">Owners</p>
                <p className="text-center">{shares.filter((n) => n).length}</p>
              </div>
              <div>
                <p className="pb-1 text-lg font-bold">Superowners 👑</p>
                {minimumShares && minimumShares > 0 ? (
                  <p className="text-center">
                    {shares.filter((n) => n >= minimumShares).length} /{" "}
                    {allowedSuperOwners}
                  </p>
                ) : (
                  <p className="text-center"> 0 / 0 </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-center py-12 md:pt-8 md:pb-0">
            <ConnectButton.Custom>
              {({ account, chain, openConnectModal, mounted }) =>
                !mounted || !account || !chain ? (
                  <Button
                    label="Connect wallet"
                    onClick={openConnectModal}
                    type="button"
                  />
                ) : (
                  <Button
                    label="Create slicer"
                    type="submit"
                    loading={loadingButton}
                  />
                )
              }
            </ConnectButton.Custom>
          </div>
        </div>
      </div>
    </form>
  )
}

export default SliceForm
