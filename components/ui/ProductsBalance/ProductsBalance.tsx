import Arrow from "@components/icons/Arrow"
import { releaseEthToSlicer } from "@lib/handlers/chain"
import getEthFromWei from "@utils/getEthFromWei"
import { Message } from "@utils/handleMessage"
import handleSubmit from "@utils/handleSubmit"
import { useState } from "react"
import { useAppContext } from "../context"
import MessageBlock from "../MessageBlock"

type Props = {
  slicerId: number
  productsModuleBalance: string
}

const ProductsBalance = ({ slicerId, productsModuleBalance }: Props) => {
  const { connector } = useAppContext()

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState<Message>({
    message: "",
    messageStatus: "success"
  })

  const executeRelease = async () => {
    const eventLogs = await handleSubmit(
      releaseEthToSlicer(connector, slicerId),
      setMessage,
      setLoading,
      setSuccess,
      true
    )
    if (eventLogs) {
      setMessage({
        message: `You have released ${getEthFromWei(
          productsModuleBalance
        )} ETH to the slicer! 🎉`,
        messageStatus: "success"
      })
    }
  }

  return productsModuleBalance && productsModuleBalance.length > 1 ? (
    <div className="flex items-center mt-2 text-sm">
      {!success ? (
        !loading ? (
          <>
            <p>
              Product balance:{" "}
              <span className="font-medium text-black">
                {getEthFromWei(productsModuleBalance)} ETH
              </span>
            </p>
            <a
              className="flex items-center ml-3 highlight group"
              onClick={() => executeRelease()}
            >
              <p>Release</p>
              <div className="w-5 h-5 ml-1 transition-transform duration-150 group-hover:translate-x-1">
                <Arrow />
              </div>
            </a>
          </>
        ) : (
          <p>Release in progress ...</p>
        )
      ) : (
        <MessageBlock msg={message} />
      )}
    </div>
  ) : null
}

export default ProductsBalance
