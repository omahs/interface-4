import {
  ActionScreen,
  ConnectBlock,
  Container,
  DoubleText,
  TransferForm,
} from "@components/ui"
import { useAppContext } from "@components/ui/context"
import fetcher from "@utils/fetcher"
import { GetStaticPropsContext, InferGetStaticPropsType } from "next"
import { useEffect, useState } from "react"
import useSWR from "swr"
import { NextSeo } from "next-seo"
import {
  defaultDescription,
  defaultTitle,
  domain,
} from "@components/common/Head"

const Transfer = ({
  slicerInfo,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { account } = useAppContext()
  const { data } = useSWR(
    account ? `/api/account/${account}/slicers` : null,
    fetcher
  )
  const [ownedShares, setOwnedShares] = useState<number>()

  useEffect(() => {
    if (data && slicerInfo) {
      const el = data.idsUint.filter((e) => Number(e.hex) === slicerInfo?.id)
      const index = data.idsUint.indexOf(el[0])
      const sh = data.shares[index]
      setOwnedShares(Number(sh?.hex) || 0)
    }
  }, [data])

  return (
    <Container page={true}>
      <ConnectBlock>
        <main className="max-w-[440px] mx-auto sm:pb-20">
          <DoubleText
            inactive
            logoText="Transfer"
            size="text-4xl sm:text-5xl"
            position="pb-12"
          />
          {slicerInfo?.id !== null ? (
            <>
              <NextSeo
                title={`Transfer slices | Slicer #${slicerInfo?.id}`}
                openGraph={{
                  title: defaultTitle,
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
              {ownedShares ? (
                <TransferForm
                  account={account}
                  slicerId={slicerInfo?.id}
                  ownedShares={ownedShares}
                />
              ) : (
                <ActionScreen
                  text="You hold no slices of this slicer"
                  href="/"
                  buttonLabel="Return to home"
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

export async function getStaticPaths() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  const { totalSlicers } = await fetcher(`${baseUrl}/api/slicer/total`)
  //  const totalSlicers = 0
  const paths = [...Array(totalSlicers).keys()].map((slicerId) => {
    const id = String(slicerId)
    return {
      params: {
        id,
      },
    }
  })

  return { paths, fallback: true }
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  const id = context.params.id

  try {
    const slicerInfo = await fetcher(`${baseUrl}/api/slicer/${id}`)
    return {
      props: {
        slicerInfo,
      },
      revalidate: 10,
    }
  } catch (err) {
    throw err
  }
}

export default Transfer
