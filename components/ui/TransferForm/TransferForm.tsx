import { useState, Dispatch, SetStateAction, useEffect } from "react"
import { Button } from "@components/ui"
import { Slice } from "@lib/handlers/chain"
import handleSubmit from "@utils/handleSubmit"
import handleMessage from "@utils/handleMessage"
import { LogDescription } from "ethers/lib/utils"
import { useAppContext } from "../context"
import BlockchainCall from "../BlockchainCall"
import Transfer from "pages/slicer/[id]/transfer"
import getLog from "@utils/getLog"
import TransferShares from "@lib/handlers/chain/TransferShares"
import Input from "../Input"

type Props = {
  slicerId: number
  ownedShares: number
}

const TransferForm = ({ slicerId, ownedShares }: Props) => {
  const { account } = useAppContext()
  const [address, setAddress] = useState("")
  const [shares, setShares] = useState<number>()

  const [success, setSuccess] = useState(false)
  const [logs, setLogs] = useState<LogDescription[]>()
  const eventLog = getLog(logs, "MintTriggered")

  const [{ message, messageStatus }, setMessage] = useState({
    message: "",
    messageStatus: "success",
  })

  return (
    <div className="px-4 pt-10 pb-8 bg-white sm:px-8 rounded-2xl">
      <div className="space-y-6">
        <div>
          <Input
            type="string"
            label="Receiver address"
            placeholder="0x... / vitalik.eth"
            value={address}
            onChange={setAddress}
          />
        </div>
        <div>
          <Input
            type="number"
            label="Slices"
            placeholder={`Up to ${ownedShares} shares`}
            value={shares}
            onChange={setShares}
          />
        </div>
        <BlockchainCall
          label="Transfer slices"
          action={() => TransferShares(account, address, slicerId, shares)}
          success={success}
          setSuccess={setSuccess}
          setLogs={setLogs}
        />
      </div>
    </div>
  )
}

export default TransferForm
