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
}

const TransferForm = ({ slicerId }: Props) => {
  const { account } = useAppContext()
  const [address, setAddress] = useState("")
  const [shares, setShares] = useState(0)

  const [success, setSuccess] = useState(false)
  const [logs, setLogs] = useState<LogDescription[]>()
  const eventLog = getLog(logs, "MintTriggered")

  const [{ message, messageStatus }, setMessage] = useState({
    message: "",
    messageStatus: "success",
  })

  return (
    <div className="p-8 bg-white">
      <Input type="string" value={address} onChange={setAddress} />
      <Input type="number" value={shares} onChange={setShares} />
      <BlockchainCall
        label="Transfer slices"
        action={() => TransferShares(account, address, slicerId, shares)}
        success={success}
        setSuccess={setSuccess}
        setLogs={setLogs}
      />
    </div>
  )
}

export default TransferForm
