import { Message } from "@utils/handleMessage"

type Props = {
  msg: Message
}

const MessageBlock = ({ msg }: Props) => {
  const { message, messageStatus } = msg

  return (
    msg && (
      <p
        className={
          messageStatus === "error" ? "text-red-500" : "text-green-600"
        }
      >
        {message}
      </p>
    )
  )
}

export default MessageBlock
