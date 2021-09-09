import Link from "next/link"
import { useState } from "react"
import {
  ActionScreen,
  ConnectBlock,
  Container,
  DoubleText,
  SliceForm,
} from "@components/ui"
import { LogDescription } from "ethers/lib/utils"
import getLog from "@utils/getLog"
import { NextSeo } from "next-seo"
import {
  defaultDescription,
  defaultTitle,
  domain,
} from "@components/common/Head"

export default function Slice() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [logs, setLogs] = useState<LogDescription[]>()
  const eventLog = getLog(logs, "TokenSliced")

  return (
    <Container page={true}>
      <NextSeo
        title="Create a new slicer"
        openGraph={{
          title: `Create a new slicer | ${defaultTitle}`,
          description: defaultDescription,
          url: `https://${domain}`,
          images: [
            {
              url: `https://${domain}/og_image.jpg`,
              width: 1000,
              height: 1000,
              alt: `${defaultTitle} cover image`,
            },
          ],
        }}
      />
      <ConnectBlock>
        <main>
          {!success ? (
            !loading ? (
              <>
                <DoubleText
                  inactive
                  logoText={`Create a Slicer`}
                  size="text-4xl sm:text-5xl"
                  position="pb-4 sm:pb-6"
                />
                <div className="py-6 mx-auto space-y-4 sm:py-8 sm:text-lg max-w-screen-xs">
                  <p>
                    Slicers are a{" "}
                    <DoubleText
                      inactive
                      logoText="special kind of fractional NFTs"
                      size="text-normal"
                    />{" "}
                    {/* <Link href="/">
                      <a className="font-black highlight">
                        special kind of fractional NFTs
                      </a>
                    </Link> */}
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
              <ActionScreen
                text="Slicing in progress ..."
                helpText={
                  <p className="max-w-sm mx-auto pb-7">
                    Please wait while the blockchain does its thing, or find the
                    slicer later in your{" "}
                    <Link href="/profile">
                      <a className="font-black highlight">profile section</a>
                    </Link>{" "}
                  </p>
                }
                loading
              />
            )
          ) : (
            <ActionScreen
              highlightTitle="Slicer created! 🍰"
              helpText={
                <div className="max-w-lg pb-6 mx-auto space-y-4">
                  <p>
                    Your slicer address is <b>{eventLog && eventLog[0]}</b>
                  </p>
                  <p>
                    If you hold the minimum slices, you can now customize it by
                    clicking on the edit icon near the slicer name
                  </p>
                </div>
              }
              buttonLabel="Go to slicer"
              href={`/slicer/${Number(eventLog?.tokenId)}`}
              buttonLabelSecondary="Create a new Slicer"
              onClickSecondary={() => setSuccess(false)}
            />
          )}
        </main>
      </ConnectBlock>
    </Container>
  )
}
