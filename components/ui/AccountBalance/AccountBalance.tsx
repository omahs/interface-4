import Arrow from "@components/icons/Arrow"
import { Withdraw } from "@lib/handlers/chain"
import getEthFromWei from "@utils/getEthFromWei"
import { ethers } from "ethers"
import { useAppContext } from "../context"

type Props = {
  account: string
  payeeCurrencyData: any
}

const AccountBalance = ({ account, payeeCurrencyData }: Props) => {
  const { connector } = useAppContext()

  const currency = payeeCurrencyData && payeeCurrencyData[0]?.currency?.id
  const balance = payeeCurrencyData && payeeCurrencyData[0]?.toWithdraw

  return balance ? (
    <div className="flex items-center justify-end py-6">
      <p>
        You have earned <b>{getEthFromWei(balance)} ETH</b>
      </p>
      <a
        className="flex items-center ml-3 highlight group"
        onClick={() =>
          Withdraw(connector, account, ethers.constants.AddressZero)
        }
      >
        <p>Withdraw</p>
        <div className="w-5 h-5 ml-1 transition-transform duration-150 group-hover:translate-x-1">
          <Arrow />
        </div>
      </a>
    </div>
  ) : null
}

export default AccountBalance

// Todo: Add sorting options, if possible also by unreleased amount
// Todo: Unrelease batch
