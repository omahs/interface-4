import { Button } from "@components/ui"
import Input from "../Input"
import { useState } from "react"
import fetcher from "@utils/fetcher"
import sendSlack from "@utils/sendSlack"
import MessageBlock from "../MessageBlock"
import handleMessage, { Message } from "@utils/handleMessage"

const SubscribeForm = () => {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState<Message>({
    message: "",
    messageStatus: "success",
  })

  const handleSubscribe = async (event) => {
    event.preventDefault()
    setLoading(true)
    try {
      const body = {
        body: JSON.stringify({
          email,
        }),
        method: "POST",
      }
      await fetcher("/api/subscribe_email", body)
      await sendSlack("Someone has subscribed to email! 🎉")
      setSuccess(true)
    } catch (error) {
      handleMessage(
        { message: "You are already subscribed", messageStatus: "error" },
        setMessage
      )
    }
    setLoading(false)
  }

  return (
    <form
      className="mx-auto space-y-6 max-w-[520px]"
      onSubmit={handleSubscribe}
    >
      <p>
        Things are moving fast and we can&apos;t wait to show you what
        unprecedented things are about to become possible with slicers.{" "}
      </p>
      <p>
        If you don&apos;t want to lose any news surrounding Slice, you can sign
        up to our newsletter.
      </p>
      <div className="max-w-[350px] mx-auto pt-4">
        <Input
          type="email"
          placeholder="Your email"
          onChange={setEmail}
          error={message.message !== ""}
          disabled={loading}
          required
          inverted
        />
      </div>
      <div className="py-3">
        <Button label="Subscribe" type="submit" loading={loading} />
      </div>
      <p className="text-sm text-gray-300">No spam. Ever.</p>
      <MessageBlock msg={message} />
    </form>
  )
}

export default SubscribeForm

// Todo: handle after success
