import { useRouter } from "next/router"
import {
  ConnectBlock,
  Container,
  DoubleText,
  TotalBalance,
  ToWithdrawList
} from "@components/ui"
import { NextSeo } from "next-seo"
import {
  defaultDescription,
  defaultTitle,
  longTitle,
  domain
} from "@components/common/Head"
import { useAppContext } from "@components/ui/context"
import useQuery from "@utils/subgraphQuery"
import { useEffect, useState } from "react"
import useCurrenciesData, { Currency } from "@utils/useCurrenciesData"
import { GetStaticPropsContext } from "next"
import { BigNumber, ethers } from "ethers"
import { defaultProvider } from "@lib/useProvider"
import { FundingCycles } from "types/typechain/FundingCycles"
import JBFundingCycles from "artifacts/contracts/JBFundingCycles.sol/JBFundingCycles.json"
import constants from "../constants.json"

export default function Earnings({ slxRate }) {
  const router = useRouter()
  const { account } = useAppContext()
  const [currencies, setCurrencies] = useState<Currency[]>()
  const { address } = router.query

  const wallet = router.isReady ? address || account : null

  const tokensQuery = /* GraphQL */ `
      payee(id: "${wallet?.toLowerCase()}") {
        currencies {
          id
          withdrawn
          toWithdraw
          toPayToProtocol
          paidToProtocol
        }
      }
    `
  let subgraphData = useQuery(tokensQuery, [wallet])
  const { currenciesData, currenciesDataDb } = useCurrenciesData(
    subgraphData,
    wallet
  )

  // TODO: Use currenciesDataDb to show data earlier?
  useEffect(() => {
    setCurrencies(currenciesData)
  }, [currenciesData])

  return (
    <Container page={true}>
      <NextSeo
        title="Your earnings"
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
        <main className="sm:mx-auto sm:max-w-screen-md">
          <div className="pb-16 sm:pb-20">
            <DoubleText
              inactive
              logoText="Earnings"
              size="text-3xl sm:text-5xl"
            />
            <p className="pt-6 text-sm text-gray-500 ">
              <a
                className="highlight"
                target="_blank"
                rel="noreferrer"
                href={`https://${
                  process.env.NEXT_PUBLIC_CHAIN_ID === "5" ? "goerli." : ""
                }etherscan.io/address/${wallet}`}
              >
                {wallet?.replace(wallet.substring(5, wallet.length - 3), `___`)}
              </a>
            </p>
          </div>
          <TotalBalance currencies={currencies} slxRate={slxRate} />
          <ToWithdrawList
            currencies={currencies}
            account={wallet}
            setCurrencies={setCurrencies}
          />
        </main>
      </ConnectBlock>
    </Container>
  )
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const fundingCycles = new ethers.Contract(
    constants[process.env.NEXT_PUBLIC_CHAIN_ID][
      process.env.NEXT_PUBLIC_ENVIRONMENT
    ].addresses.JBFundingCycles,
    JBFundingCycles.abi,
    defaultProvider
  ) as FundingCycles

  const data = await fundingCycles.currentOf(
    constants[process.env.NEXT_PUBLIC_CHAIN_ID][
      process.env.NEXT_PUBLIC_ENVIRONMENT
    ].constants.JBProjectId
  )

  const reservedRate = 50
  const slxRate: BigNumber =
    data && data[6].div(BigNumber.from(10).pow(18)).mul(reservedRate).div(100)

  return {
    props: {
      slxRate: slxRate._hex
    },
    revalidate: 3600
  }
}
