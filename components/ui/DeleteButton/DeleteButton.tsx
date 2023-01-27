import Trash from "@components/icons/Trash"
import { useState } from "react"
import Spinner from "@components/icons/Spinner"
import { useContractWrite, usePrepareContractWrite } from "wagmi"
import { useRouter } from "next/router"
import constants from "constants.json"
import ProductsModuleContract from "artifacts/contracts/ProductsModule.sol/ProductsModule.json"
import { useAddRecentTransaction } from "@rainbow-me/rainbowkit"
import saEvent from "@utils/saEvent"
import fetcher from "@utils/fetcher"
import executeTransaction from "@utils/executeTransaction"

type Props = {
  slicerId: number
  productId: number
}

const DeleteButton = ({ slicerId, productId }: Props) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const addRecentTransaction = useAddRecentTransaction()
  const { config } = usePrepareContractWrite({
    address:
      constants[process.env.NEXT_PUBLIC_CHAIN_ID][
        process.env.NEXT_PUBLIC_ENVIRONMENT
      ].addresses.ProductsModule,
    abi: ProductsModuleContract.abi,
    functionName: "removeProduct",
    args: [slicerId, productId]
  })
  const { writeAsync } = useContractWrite(config)

  const settlementLogic = async () => {
    saEvent("remove_product_success")
    await fetcher(`/api/slicer/${slicerId}/product/${productId}/remove`, {
      method: "DELETE"
    })
    router.reload()
  }

  const deleteProduct = async () => {
    saEvent("remove_product_attempt")
    const txData = await executeTransaction(
      writeAsync,
      setLoading,
      `Remove product ${slicerId}/${productId}`,
      addRecentTransaction
    )

    if (txData) {
      await settlementLogic()
    }
  }

  return (
    <div
      className="relative z-10 flex items-center justify-center w-full py-2 text-center text-white transition-colors duration-150 bg-red-500 rounded-md cursor-pointer group-cart hover:bg-red-600 nightwind-prevent"
      onClick={async () => await deleteProduct()}
    >
      {loading ? (
        <Spinner color="text-inherit" />
      ) : (
        <>
          <p className="mr-2 text-sm font-medium">Delete</p>
          <Trash className="w-5 h-5 group-cart-el" />
        </>
      )}
    </div>
  )
}

export default DeleteButton
