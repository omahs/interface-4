import Link from "next/link"
import { useState } from "react"
import {
  ConnectBlock,
  DoubleText,
  SliceForm,
  SliceLoad,
  SliceSuccess,
} from "@components/ui"
import { useAppContext } from "@components/ui/context"
import { LogDescription } from "ethers/lib/utils"

export default function Slice() {
  const { isConnected } = useAppContext()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [log, setLog] = useState<LogDescription>()
  const eventLog = log?.args

  return (
    <main>
      <DoubleText
        inactive
        logoText={`Create a Slicer`}
        size="text-4xl sm:text-6xl"
        position="pb-8"
      />
      {isConnected ? (
        !success ? (
          !loading ? (
            <>
              <div className="py-4 mx-auto space-y-4 sm:text-lg max-w-screen-xs">
                <p>
                  Slicers are a{" "}
                  <Link href="/">
                    <a className="font-extrabold highlight">
                      special kind of fractionable NFTs
                    </a>
                  </Link>{" "}
                  which can be shared among multiple accounts.
                </p>
                <p>
                  When slicers receive ETH, owners can redeem an amount
                  proportional to the owned shares.
                </p>
              </div>
              <SliceForm
                setLoading={setLoading}
                setSuccess={setSuccess}
                setLog={setLog}
              />
            </>
          ) : (
            <SliceLoad />
          )
        ) : (
          <SliceSuccess setSuccess={setSuccess} eventLog={eventLog} />
        )
      ) : (
        <ConnectBlock />
      )}
    </main>
  )
}
