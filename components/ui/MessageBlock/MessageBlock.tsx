import { Message } from "@utils/handleMessage"

type Props = {
  msg: Message
}

const MessageBlock = ({ msg }: Props) => {
  return msg ? (
    <p
      className={
        msg.messageStatus === "error" ? "text-red-500" : "text-green-600"
      }
    >
      {msg.message}
    </p>
  ) : null
}

export default MessageBlock
