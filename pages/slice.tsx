import Link from "next/link"
import { Button, ConnectBlock, DoubleText, SliceForm } from "@components/ui"
import { useAppContext } from "@components/ui/context"

export default function Home() {
  const { isConnected } = useAppContext()

  return (
    <main>
      <DoubleText
        inactive
        logoText={`Create a Slicer`}
        size="text-4xl sm:text-6xl"
        position="pb-8"
      />
      {isConnected ? (
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
              When slicers receive ETH, owners can redeem an amount proportional
              to the owned shares.
            </p>
          </div>
          <h2 className="pt-8">Just slice it</h2>
          <SliceForm />
        </>
      ) : (
        <ConnectBlock />
      )}
    </main>
  )
}
