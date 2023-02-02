import Link from "next/link"
import { useState } from "react"
import { ActionScreen, Container, DoubleText, SliceForm } from "@components/ui"
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
    <Container size="max-w-screen-xl pb-12 md:pb-0">
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

      <main>
        {!success ? (
          !loading ? (
            <>
              <div className="max-w-2xl pt-32 pb-12 mx-auto text-center">
                <DoubleText
                  inactive
                  logoText="Create Slicer"
                  size="text-4xl sm:text-5xl"
                  position="pb-4 sm:pb-6"
                />
                <p className="text-lg leading-8 text-gray-600">
                  Slicers are on-chain stores that split any payment received to
                  their owners.
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
                <div className="max-w-sm pb-6 mx-auto space-y-6">
                  <p>
                    Please wait while the blockchain does its thing, or find the
                    slicer later in your{" "}
                    <Link href="/profile">
                      <a className="font-black highlight">profile section</a>
                    </Link>{" "}
                  </p>

                  <p className="max-w-sm mx-auto">
                    To make the slicer immediately appear on the website{" "}
                    <b className="text-yellow-600">
                      don&apos;t leave this page until the process has completed
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
                  If you are a superowner, you can now customize it by clicking
                  on the edit icon near the slicer name
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
    </Container>
  )
}
