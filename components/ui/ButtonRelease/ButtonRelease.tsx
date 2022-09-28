import { NewTransaction } from "@rainbow-me/rainbowkit/dist/transactions/transactionStore"
import executeTransaction from "@utils/executeTransaction"
import { BigNumber } from "ethers"
import { formatEther } from "ethers/lib/utils"
import { useContractWrite, usePrepareContractWrite } from "wagmi"
import { Button } from "@components/ui"
import Slicer from "artifacts/contracts/Slicer.sol/Slicer.json"
import { useAppContext } from "../context"
import { useState } from "react"
import formatNumber from "@utils/formatNumber"
import WithdrawIcon from "@components/icons/WithdrawIcon"

type Props = {
  slicerAddress: string
  unreleasedAmount: {
    currency: string
    amount: BigNumber
    symbol?: string
  }
  addRecentTransaction: (transaction: NewTransaction) => void
}

const ButtonRelease = ({
  slicerAddress,
  unreleasedAmount,
  addRecentTransaction
}: Props) => {
  const [releaseLoading, setReleaseLoading] = useState(false)
  const [releaseWithdrawLoading, setReleaseWithdrawLoading] = useState(false)
  const { account } = useAppContext()

  const symbol = unreleasedAmount.symbol || "???"

  const { config: releaseConfig } = usePrepareContractWrite({
    addressOrName: slicerAddress,
    contractInterface: Slicer.abi,
    functionName: "release",
    args: [account, unreleasedAmount.currency, false]
  })
  const { writeAsync: releaseWriteAsync } = useContractWrite(releaseConfig)

  const { config: releaseWithdrawConfig } = usePrepareContractWrite({
    addressOrName: slicerAddress,
    contractInterface: Slicer.abi,
    functionName: "release",
    args: [account, unreleasedAmount.currency, true]
  })
  const { writeAsync: releaseWithdrawWriteAsync } = useContractWrite(
    releaseWithdrawConfig
  )

  const amount = formatNumber(
    Math.floor(Number(formatEther(unreleasedAmount.amount)) * 1000) / 1000
  )

  return (
    // amount != 0 && (
    <div className="flex text-sm ">
      <Button
        className="h-[36px] font-semibold rounded-l-sm nightwind-prevent text-center w-36 focus:outline-none"
        label={`Release ${amount} ${symbol}`}
        loading={releaseLoading || releaseWithdrawLoading}
        onClick={async () =>
          await executeTransaction(
            releaseWriteAsync,
            setReleaseLoading,
            `Release ${symbol}`,
            addRecentTransaction
          )
        }
        double={false}
      />
      <Button
        className="h-[36px] font-semibold rounded-r-sm nightwind-prevent w-16 focus:outline-none"
        color={`text-white ${
          releaseLoading
            ? "bg-gray-600 cursor-default"
            : "bg-green-600 hover:bg-green-700 focus:bg-green-700"
        }`}
        label={
          <>
            <WithdrawIcon className="w-5 h-5 rotate-180" />
          </>
        }
        loading={releaseWithdrawLoading}
        onClick={async () =>
          !releaseLoading &&
          (await executeTransaction(
            releaseWithdrawWriteAsync,
            setReleaseWithdrawLoading,
            `Release ${symbol}`,
            addRecentTransaction
          ))
        }
        double={false}
      />
    </div>
    // )
  )
}

export default ButtonRelease
