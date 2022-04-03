import Arrow from "@components/icons/Arrow"
import { Withdraw } from "@lib/handlers/chain"
import getEthFromWei from "@utils/getEthFromWei"
import getLog from "@utils/getLog"
import { Message } from "@utils/handleMessage"
import handleSubmit from "@utils/handleSubmit"
import { ethers, utils } from "ethers"
import { useState } from "react"
import { useAppContext } from "../context"
import MessageBlock from "../MessageBlock"

type Props = {
  account: string
  payeeCurrencyData: any
}

const AccountBalance = ({ account, payeeCurrencyData }: Props) => {
  const { connector } = useAppContext()

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState<Message>({
    message: "",
    messageStatus: "success"
  })

  const currency = payeeCurrencyData && payeeCurrencyData[0]?.currency?.id
  const balance = payeeCurrencyData && payeeCurrencyData[0]?.toWithdraw

  const executeWithdraw = async () => {
    const eventLogs = await handleSubmit(
      Withdraw(connector, account, ethers.constants.AddressZero),
      setMessage,
      setLoading,
      setSuccess,
      true
    )
    if (eventLogs) {
      const eventLog = getLog(eventLogs, "Withdrawn")
      const withdrawnEth = eventLog[2]._hex
      const protocolPaidEth = eventLog[3]._hex
      setMessage({
        message: `You have withdrawn ${Number(
          utils.formatEther(withdrawnEth)
        ).toFixed(3)} ETH + ${Number(
          utils.formatEther(protocolPaidEth)
        ).toFixed(3)} ETH converted to SLX! 🎉`,
        messageStatus: "success"
      })
    }
  }

  // TODO: update withdraw balance in parent component after withdrawing

  return balance ? (
    <div className="flex items-center justify-end py-6">
      {!success ? (
        !loading ? (
          <>
            <p>
              You have earned <b>{getEthFromWei(balance)} ETH</b>
            </p>
            <a
              className="flex items-center ml-3 highlight group"
              onClick={() => executeWithdraw()}
            >
              <p>Withdraw</p>
              <div className="w-5 h-5 ml-1 transition-transform duration-150 group-hover:translate-x-1">
                <Arrow />
              </div>
            </a>{" "}
          </>
        ) : (
          <p>Withdrawing ...</p>
        )
      ) : (
        <MessageBlock msg={message} />
      )}
    </div>
  ) : null
}

export default AccountBalance

// Todo: Add sorting options, if possible also by unreleased amount
// Todo: Unrelease batch
