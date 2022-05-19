import Link from "next/link"
import { useState } from "react"
import {
  ActionScreen,
  ConnectBlock,
  Container,
  DoubleText,
  PieChart,
  SliceForm
} from "@components/ui"
import { LogDescription } from "ethers/lib/utils"
import getLog from "@utils/getLog"
import { NextSeo } from "next-seo"
import {
  defaultDescription,
  defaultTitle,
  domain
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
          url: domain,
          images: [
            {
              url: `${domain}/og_image.jpg`,
              width: 1000,
              height: 1000,
              alt: `${defaultTitle} cover image`
            }
          ]
        }}
      />

      <ConnectBlock>
        <main>
          {!success ? (
            !loading ? (
              <>
                <div className="sm:text-left">
                  <DoubleText
                    inactive
                    logoText={`Create a Slicer`}
                    size="text-4xl sm:text-5xl"
                    position="pb-4 sm:pb-6"
                  />
                  <div className="py-6 space-y-4 sm:px-6 max-w-screen-xs sm:pl-0">
                    <p>
                      Slicers split any payment received to their owners,
                      proportionally to number of slices held.
                    </p>
                    <p>
                      Slices are{" "}
                      <DoubleText
                        inactive
                        logoText="tradable, fractionalized NFTs"
                        size="text-normal"
                      />{" "}
                      (ERC1155 tokens) that represent ownership over a slicer.
                    </p>
                  </div>
                  <p className="pt-6 font-semibold text-center sm:text-left text-yellow-600">
                    Add initial owners and their slices
                  </p>
                  <SliceForm
                    success={success}
                    setLoading={setLoading}
                    setSuccess={setSuccess}
                    setLogs={setLogs}
                  />
                </div>
              </>
            ) : (
              <ActionScreen
                text="Slicing in progress ..."
                helpText={
                  <div className="max-w-sm pb-6 mx-auto space-y-6">
                    <p>
                      Please wait while the blockchain does its thing, or find
                      the slicer later in your{" "}
                      <Link href="/profile">
                        <a className="font-black highlight">profile section</a>
                      </Link>{" "}
                    </p>

                    <p className="max-w-sm mx-auto">
                      To make the slicer immediately appear on the website{" "}
                      <b className="text-yellow-600">
                        don&apos;t leave this page until the process has
                        completed
                      </b>
                    </p>
                  </div>
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
                    If you are a superowner, you can now customize it by
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
