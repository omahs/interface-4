import {
  ActionScreen,
  ConnectBlock,
  DoubleText,
  TransferForm,
} from "@components/ui"
import { useAppContext } from "@components/ui/context"
import fetcher from "@utils/fetcher"
import { GetStaticPropsContext, InferGetStaticPropsType } from "next"
import { useEffect, useState } from "react"
import useSWR from "swr"

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
      const el = data.idsUint.filter((e) => Number(e.hex) === slicerInfo.id)
      const index = data.idsUint.indexOf(el[0])
      const sh = data.shares[index]
      setOwnedShares(Number(sh.hex))
    }
  }, [data])

  return (
    <ConnectBlock>
      <main className="max-w-[420px] mx-auto">
        <DoubleText
          inactive
          logoText="Transfer"
          size="text-4xl sm:text-5xl"
          position="pb-12"
        />
        {slicerInfo?.id !== null ? (
          <TransferForm
            account={account}
            slicerId={slicerInfo?.id}
            ownedShares={ownedShares}
          />
        ) : (
          <ActionScreen
            text="This slicer doesn't exist (yet)"
            href="/"
            buttonLabel="Return to home"
          />
        )}
      </main>
    </ConnectBlock>
  )
}

export async function getStaticPaths() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  const { totalSlicers } = await fetcher(`${baseUrl}/api/slicer`)
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
