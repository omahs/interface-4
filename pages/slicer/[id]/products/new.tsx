import {
  ActionScreen,
  AddProductForm,
  ConnectBlock,
  Container,
  DoubleText,
} from "@components/ui"
import { NextSeo } from "next-seo"
import {
  defaultDescription,
  defaultTitle,
  longTitle,
  domain,
} from "@components/common/Head"
import { useAllowed } from "@lib/useProvider"
import { useRouter } from "next/dist/client/router"
import { useState } from "react"
import { LogDescription } from "ethers/lib/utils"
import getLog from "@utils/getLog"
import Spinner from "@components/icons/Spinner"

export default function NewProduct() {
  const router = useRouter()
  const { id } = router.query
  const { isAllowed, loading } = useAllowed(Number(id))
  const [loadingForm, setLoadingForm] = useState(false)
  const [uploadStep, setUploadStep] = useState(0)
  const [success, setSuccess] = useState(false)
  const [logs, setLogs] = useState<LogDescription[]>()
  const eventLog = getLog(logs, "ProductAdded")

  return (
    <Container page={true}>
      <NextSeo
        title="Add product"
        openGraph={{
          title: longTitle,
          description: defaultDescription,
          url: domain,
          images: [
            {
              url: `${domain}/og_image.jpg`,
              width: 1000,
              height: 1000,
              alt: `${defaultTitle} cover image`,
            },
          ],
        }}
      />
      <ConnectBlock>
        {loading ? (
          <main className="max-w-[420px] mx-auto sm:max-w-screen-md">
            <DoubleText
              inactive
              logoText="Add product"
              size="text-4xl sm:text-5xl"
              position="pb-12"
            />
            <div className="flex justify-center pb-20">
              <Spinner size="w-10 h-10" />
            </div>
          </main>
        ) : isAllowed ? (
          !success ? (
            !loadingForm ? (
              <main className="max-w-[420px] mx-auto sm:max-w-screen-md">
                <DoubleText
                  inactive
                  logoText="Add product"
                  size="text-4xl sm:text-5xl"
                  position="pb-8 sm:pb-12"
                />
                <AddProductForm
                  slicerId={Number(id)}
                  success={success}
                  loading={loadingForm}
                  setLoading={setLoadingForm}
                  uploadStep={uploadStep}
                  setUploadStep={setUploadStep}
                  setSuccess={setSuccess}
                  setLogs={setLogs}
                />
              </main>
            ) : (
              <ActionScreen
                text="Adding product ..."
                helpText="Please wait while the blockchain does its thing"
                loading
              />
            )
          ) : (
            <ActionScreen
              highlightTitle="Product added! 🍰"
              helpText={
                <p className="pb-6">
                  You can find the new product with id{" "}
                  <b>{eventLog && eventLog[0]}</b> in the slicer page.
                </p>
              }
              buttonLabel="Go to slicer"
              href={`/slicer/${id}`}
              buttonLabelSecondary="Add product"
              onClickSecondary={() => setSuccess(false)}
            />
          )
        ) : (
          <ActionScreen
            text="You are not allowed to access this page"
            href="/"
            buttonLabel="Return to home"
          />
        )}
      </ConnectBlock>
    </Container>
  )
}
