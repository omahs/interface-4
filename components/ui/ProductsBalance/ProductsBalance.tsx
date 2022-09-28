import Arrow from "@components/icons/Arrow"
import { releaseEthToSlicer } from "@lib/handlers/chain"
import { useAddRecentTransaction } from "@rainbow-me/rainbowkit"
import getEthFromWei from "@utils/getEthFromWei"
import handleSubmit from "@utils/handleSubmit"
import saEvent from "@utils/saEvent"
import { BigNumber, ethers } from "ethers"
import { Dispatch, SetStateAction, useState } from "react"
import { useSigner } from "wagmi"
import { UnreleasedAmount } from "../SlicersList/SlicersList"

type Props = {
  slicerId: number
  productsModuleBalance: string
  unreleasedAmounts: UnreleasedAmount[]
  setUpdatedUnreleasedAmounts: Dispatch<SetStateAction<UnreleasedAmount[]>>
}

const ProductsBalance = ({
  slicerId,
  productsModuleBalance,
  unreleasedAmounts,
  setUpdatedUnreleasedAmounts
}: Props) => {
  const { data: signer } = useSigner()
  const addRecentTransaction = useAddRecentTransaction()

  const [loading, setLoading] = useState(false)

  const executeRelease = async () => {
    saEvent("release_eth_to_slicer_attempt")
    setLoading(true)
    const eventLogs = await handleSubmit(
      releaseEthToSlicer(signer, slicerId),
      null,
      setLoading,
      null,
      true,
      addRecentTransaction,
      `Release store earnings | Slicer #${slicerId}`
    )
    if (eventLogs) {
      saEvent("release_eth_to_slicer_success")
      const newAmounts = [...unreleasedAmounts]
      // ETH is always at index 0
      newAmounts[0] = {
        currency: ethers.constants.AddressZero,
        amount: BigNumber.from(productsModuleBalance).add(
          unreleasedAmounts[0].amount
        ),
        symbol: "ETH"
      }
      setUpdatedUnreleasedAmounts(newAmounts)
    } else {
      saEvent("release_eth_to_slicer_fail")
    }
  }

  return productsModuleBalance && productsModuleBalance.length > 1 ? (
    <div className="flex items-center mt-2 text-sm">
      {!loading ? (
        <>
          <p>
            Sales profits:{" "}
            <span className="font-medium text-black">
              {getEthFromWei(productsModuleBalance)} ETH
            </span>
          </p>
          <a
            className="flex items-center ml-3 group"
            onClick={() => executeRelease()}
          >
            <p>Send to slicer</p>
            <div className="w-5 h-5 ml-1 transition-transform duration-150 group-hover:translate-x-1">
              <Arrow />
            </div>
          </a>
        </>
      ) : (
        <p>Sending ...</p>
      )}
    </div>
  ) : null
}

export default ProductsBalance
