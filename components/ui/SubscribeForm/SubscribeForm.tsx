import { Banner, Button } from "@components/ui"
import Input from "../Input"
import { useState } from "react"
import fetcher from "@utils/fetcher"
import sendSlack from "@utils/sendSlack"
import MessageBlock from "../MessageBlock"
import handleMessage, { Message } from "@utils/handleMessage"
import { accounts } from "../Social/Social"

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
    <Banner title="Stay in the loop" id="subscribe" inverted>
      <div className="max-w-sm mx-auto space-y-6">
        {!success ? (
          <form className="px-2 space-y-4 sm:px-0" onSubmit={handleSubscribe}>
            <p>
              Sign up to our newsletter to keep up to date with the latest
              features and news about Slice.
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
        ) : (
          <>
            <p className="text-lg font-bold">
              You have successfully subscribed!
            </p>
            <p>
              Feel free to check out our socials, and if you&apos;re interested
              in contributing please reach out on{" "}
              <a
                className="text-white highlight highlight-inverted"
                href={accounts.discord}
                target="_blank"
                rel="noreferrer"
              >
                Discord
              </a>{" "}
              or{" "}
              <a
                className="text-white highlight highlight-inverted"
                href={accounts.twitter}
                target="_blank"
                rel="noreferrer"
              >
                Twitter!
              </a>{" "}
            </p>
          </>
        )}
      </div>
    </Banner>
  )
}

export default SubscribeForm
