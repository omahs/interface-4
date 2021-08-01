import { Button } from "@components/ui"
import { useAppContext } from "@components/ui/context"

const ConnectBlock = ({ children }) => {
  const { isConnected } = useAppContext()
  return isConnected ? (
    children
  ) : (
    <>
      <div className="flex flex-col items-center max-w-screen-sm py-6 mx-auto">
        <h3>Connect your wallet</h3>
        <p className="pt-8 pb-10">
          If you don&apos;t have a wallet, you can get a{" "}
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
