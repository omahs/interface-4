import { Message } from "@utils/handleMessage"

type Props = {
  msg: Message
  className?: string
}

const MessageBlock = ({ msg, className = "" }: Props) => {
  return msg.message ? (
    <p
      className={`${className} ${
        msg.messageStatus === "error" ? "text-red-500" : "text-green-600"
      }`}
    >
      {msg.message}
    </p>
  ) : null
}

export default MessageBlock
