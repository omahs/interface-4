import { Button } from "@components/ui"
import { useAppContext } from "@components/ui/context"

const ConnectBlock = ({ children }) => {
  const { isConnected } = useAppContext()
  return isConnected ? (
    children
  ) : (
    <>
      <div className="flex flex-col items-center py-6">
        <h3 className="pb-10">Connect with your wallet to continue</h3>
        <Button label="Connect" requireConnection />
      </div>
    </>
  )
}

export default ConnectBlock
