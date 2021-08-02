import { Button } from "@components/ui"
import { useAppContext } from "@components/ui/context"
import DoubleText from "../DoubleText"

const ConnectBlock = ({ children }) => {
  const { isConnected } = useAppContext()
  return isConnected ? (
    children
  ) : (
    <>
      <div className="flex flex-col items-center py-6 mx-auto max-w-screen-xs">
        <DoubleText
          inactive
          logoText="Connect your wallet"
          size="text-4xl sm:text-5xl"
        />
        <p className="py-10 text-lg">
          If you don&apos;t have one, you can get a{" "}
          <a
            href="https://metamask.io/"
            target="_blank"
            rel="noreferrer"
            className="font-black highlight"
          >
            free Metamask wallet
          </a>{" "}
          to interact with Slice.
        </p>
        <Button label="Connect" requireConnection />
      </div>
    </>
  )
}

export default ConnectBlock
