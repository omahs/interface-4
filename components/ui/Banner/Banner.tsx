import { DoubleText } from "@components/ui"
import SubscribeForm from "../SubscribeForm"

const Banner = () => {
  return (
    <>
      <div className="relative py-24 text-center text-white bg-gray-800">
        <div className="pb-8 sm:pb-12">
          <DoubleText
            inactive
            inverted
            logoText={`Stay in the loop`}
            size="text-4xl sm:text-5xl"
            position=""
          />
        </div>
        <SubscribeForm />
      </div>
    </>
  )
}

export default Banner
