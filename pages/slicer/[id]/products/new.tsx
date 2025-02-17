import {
  ActionScreen,
  AddProductForm,
  ConnectBlock,
  Container,
  DoubleText
} from "@components/ui"
import { NextSeo } from "next-seo"
import {
  defaultDescription,
  defaultTitle,
  longTitle,
  domain
} from "@components/common/Head"
import { useAllowed } from "@lib/useProvider"
import { useRouter } from "next/dist/client/router"
import { useEffect, useState } from "react"
import { LogDescription } from "ethers/lib/utils"
import getLog from "@utils/getLog"
import Spinner from "@components/icons/Spinner"
import { useAppContext } from "@components/ui/context"
import { StrategyParams } from "@components/priceStrategies/strategies"
import useSWR from "swr"
import fetcher from "@utils/fetcher"
import decimalToHex from "@utils/decimalToHex"

export type Step = {
  status: string
  label: string
}

const subtitle = "Configure a product to be sold on your decentralized store"

export default function NewProduct() {
  const initSteps = [
    { status: "", label: "General" },
    { status: "", label: "Availability" },
    { status: "", label: "Pricing" },
    { status: "", label: "On-chain action" },
    { status: "", label: "Redeem info" },
    { status: "", label: "Notes & files" },
    { status: "", label: "Review" }
  ]

  const { setModalView } = useAppContext()
  const router = useRouter()
  const { id } = router.query
  const { isAllowed, loading } = useAllowed(Number(id))
  const [steps, setSteps] = useState(initSteps)
  const [progressStep, setProgressStep] = useState(initSteps[0].label)
  const [uploadStep, setUploadStep] = useState(0)
  const [uploadPct, setUploadPct] = useState(0)
  const [cloneAddress, setCloneAddress] = useState("")
  const [priceParams, setPriceParams] = useState<StrategyParams>()
  const [success, setSuccess] = useState(false)
  const [logs, setLogs] = useState<LogDescription[]>()
  const eventLog = getLog(logs, "ProductAdded")
  const productId = eventLog && Number(eventLog[1]._hex)
  const progressStepIndex = steps.findIndex(
    ({ label }) => label == progressStep
  )

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  const hexId = decimalToHex(Number(id))
  const { data: slicerInfo } = useSWR(
    Number(id) ? `${baseUrl}/api/slicer/${hexId}?stats=false` : null,
    fetcher
  )
  const idPath = slicerInfo?.slicerConfig?.customPath || id

  useEffect(() => {
    if (uploadStep != 0) {
      setModalView({
        cross: uploadStep == 10 ? true : false,
        name: `CREATE_PRODUCT_VIEW`,
        params: {
          uploadStep,
          uploadPct,
          setModalView,
          cloneAddress,
          strategyLabel: priceParams?.label
        }
      })
    }
  }, [loading, uploadStep])

  useEffect(() => {
    if (success) {
      setSteps(initSteps)
      setProgressStep(initSteps[0].label)
    }
  }, [success])

  return (
    <Container size="max-w-screen-lg pb-12 md:pb-0">
      <NextSeo
        title="Create product"
        openGraph={{
          title: longTitle,
          description: defaultDescription,
          url: domain,
          images: [
            {
              url: `${domain}/og_image.png`,
              width: 1000,
              height: 1000,
              alt: `${defaultTitle} cover image`
            }
          ]
        }}
      />
      <ConnectBlock>
        {loading ? (
          <div>
            <div className="max-w-2xl pt-32 pb-20 mx-auto text-center">
              <DoubleText
                inactive
                logoText="Create product"
                size="text-4xl sm:text-5xl"
                position="pb-4 sm:pb-6"
              />
              <p className="text-lg leading-8 text-gray-600">{subtitle}</p>
            </div>
            <div className="flex justify-center pb-20">
              <Spinner className="w-16 h-16 text-random2-600" />
            </div>
          </div>
        ) : isAllowed == "product" || isAllowed == "full" ? (
          !success ? (
            <div className="text-center">
              <div className="max-w-2xl pt-32 pb-6 mx-auto">
                <DoubleText
                  inactive
                  logoText="Create product"
                  size="text-4xl sm:text-5xl"
                  position="pb-4 sm:pb-6"
                />
                <p className="text-lg leading-8 text-gray-600">{subtitle}</p>
              </div>
              <AddProductForm
                slicerId={Number(id)}
                uploadStep={uploadStep}
                setUploadStep={setUploadStep}
                setUploadPct={setUploadPct}
                setSuccess={setSuccess}
                setLogs={setLogs}
                setCloneAddress={setCloneAddress}
                priceParams={priceParams}
                setPriceParams={setPriceParams}
                steps={steps}
                progressStep={progressStep}
                progressStepIndex={progressStepIndex}
                setProgressStep={setProgressStep}
                setSteps={setSteps}
                idPath={idPath}
              />
            </div>
          ) : (
            <ActionScreen
              highlightTitle={`Product #${productId} created! 🍰`}
              helpText={
                <>
                  <p className="pb-3">
                    You can find the new product in the slicer page.
                  </p>
                  <p className="pb-6 text-sm text-gray-600">
                    If you don&apos;t see it, wait a few minutes and refresh the
                    page
                  </p>
                </>
              }
              buttonLabel="Go to slicer"
              href={`/slicer/${idPath}`}
              buttonLabelSecondary="Create new product"
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
