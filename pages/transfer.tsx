import {
  ActionScreen,
  ConnectBlock,
  Container,
  DoubleText,
  TransferForm
} from "@components/ui"
import { useAppContext } from "@components/ui/context"
import { useEffect, useState } from "react"
import { NextSeo } from "next-seo"
import {
  defaultDescription,
  defaultTitle,
  longTitle,
  domain
} from "@components/common/Head"
import { useRouter } from "next/dist/client/router"
import useQuery from "@utils/subgraphQuery"
import decimalToHex from "@utils/decimalToHex"

const Transfer = () => {
  const { account } = useAppContext()
  const router = useRouter()
  const { id } = router.query
  const [ownedSlices, setOwnedSlices] = useState(0)

  const hexId = decimalToHex(Number(id))

  const tokensQuery = /* GraphQL */ `
      payeeSlicer(id: "${account?.toLowerCase()}-${hexId}") {
        slices
        slicer {
          address
          slices
          minimumSlices
        }
      }
    `
  const subgraphData = useQuery(tokensQuery, [account])
  const slicer = subgraphData?.payeeSlicer?.slicer

  useEffect(() => {
    setOwnedSlices(Number(subgraphData?.payeeSlicer?.slices))
  }, [subgraphData])

  // const { data } = useSWR(id ? `/api/slicer/${id}?stats=false` : null, fetcher)

  return (
    <Container page={true}>
      <ConnectBlock>
        <main className="max-w-screen-sm mx-auto sm:pb-20">
          <DoubleText
            inactive
            logoText="Transfer"
            size="text-4xl sm:text-5xl"
            position="pb-12"
          />
          {id !== null ? (
            <>
              <NextSeo
                title="Transfer slices"
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
              {subgraphData ? (
                ownedSlices ? (
                  <TransferForm
                    account={account}
                    slicerId={String(id)}
                    ownedSlices={ownedSlices}
                    slicerAddress={slicer?.address}
                    totalSlices={slicer?.slices}
                    minimumSlices={slicer?.minimumSlices}
                  />
                ) : (
                  <ActionScreen
                    text="You hold no slices of this slicer"
                    href="/"
                    buttonLabel="Return to home"
                  />
                )
              ) : (
                <TransferForm
                  account={account}
                  slicerId={String(id)}
                  slicerAddress={null}
                  ownedSlices={0}
                  totalSlices={0}
                  minimumSlices={0}
                />
              )}
            </>
          ) : (
            <ActionScreen
              text="This slicer doesn't exist (yet)"
              href="/"
              buttonLabel="Return to home"
            />
          )}
        </main>
      </ConnectBlock>
    </Container>
  )
}

export default Transfer
