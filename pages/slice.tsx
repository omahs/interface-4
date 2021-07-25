import Link from "next/link"
import { useState } from "react"
import {
  ConnectBlock,
  DoubleText,
  SliceForm,
  SliceLoad,
  SliceSuccess,
} from "@components/ui"
import { LogDescription } from "ethers/lib/utils"
import getLog from "@utils/getLog"

export default function Slice() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [logs, setLogs] = useState<LogDescription[]>()
  const eventLog = getLog(logs, "TokenSliced")

  return (
    <ConnectBlock>
      <main>
        <DoubleText
          inactive
          logoText={`Create a Slicer`}
          size="text-4xl sm:text-6xl"
          position="pb-4"
        />
        {!success ? (
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
                  proportional to the owned slices.
                </p>
              </div>
              <SliceForm
                success={success}
                setLoading={setLoading}
                setSuccess={setSuccess}
                setLogs={setLogs}
              />
            </>
          ) : (
            <SliceLoad />
          )
        ) : (
          <SliceSuccess setSuccess={setSuccess} eventLog={eventLog} />
        )}
      </main>
    </ConnectBlock>
  )
}
