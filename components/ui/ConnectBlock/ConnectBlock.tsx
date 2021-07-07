import { Button } from "@components/ui"

const ConnectBlock = () => {
  return (
    <>
      <div className="flex flex-col items-center py-6">
        <p className="text-lg mb-7">
          Connect with your wallet to access this page
        </p>
        <Button label="Connect" requireConnection />
      </div>
    </>
  )
}

export default ConnectBlock
