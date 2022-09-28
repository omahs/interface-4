import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "@lib/prisma"
import { SlicerReduced } from "pages/slicer"
import corsMiddleware from "@utils/corsMiddleware"
import { Currency } from "@prisma/client"
import {
  getAlchemyMetadata,
  getCurrenciesMetadata,
  getEthMetadata,
  getQuotes
} from "@utils/useCurrenciesData"
import { ethers } from "ethers"
import fetcher from "@utils/fetcher"

type Data =
  | SlicerReduced[]
  | { slicerData: SlicerReduced[]; currencyData: Currency[] }

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { ids, currencies } = req.query
  await corsMiddleware(req, res)
  try {
    if (req.method === "GET") {
      if (ids) {
        let currencyData: Currency[]
        const idList = String(ids).split("_")

        const slicerData = await prisma.slicer.findMany({
          where: {
            OR: [...idList.map((id) => ({ id: { equals: Number(id) } }))]
          }
        })

        if (currencies) {
          const currencyList = String(currencies).split("_")
          currencyData = await prisma.currency.findMany({
            where: { address: { in: currencyList } }
          })
          if (currencyData.length !== currencyList.length) {
            // Logic for unknown currencies
            // const formattedData: Currency[] = []
            const missingCurrencies = currencyList.filter(
              (currencyAddress) =>
                currencyData.findIndex(
                  (data) => data.address == currencyAddress
                ) == -1
            )

            // TODO: WIPPPPPPPP
            // getCurrenciesMetadata

            const requests = []
            missingCurrencies.forEach(async (address) => {
              // check if requested currency is present inside the DB
              const dbCurrency = currencyData.find((c) => c.address === address)
              if (dbCurrency) {
                // if present push its Metadata inside the requests
                requests.push({
                  name: dbCurrency.name,
                  symbol: dbCurrency.symbol,
                  logo: dbCurrency.logo
                })
              } else {
                if (address === ethers.constants.AddressZero) {
                  // if ETH push eth metadata
                  requests.push(getEthMetadata())
                } else {
                  // if not present search for the currency on alchemy
                  requests.push(getAlchemyMetadata(address))
                }
              }
            })

            const metadata = await Promise.all(requests)
            const formattedMetadata = metadata.map((m) => {
              return {
                name: m?.name || "",
                symbol: m?.symbol || "",
                logo: m?.logo || ""
              }
            })

            //getQuotes

            // metadata could be either dbCurrencies ot metadata taken from alchemy API
            const formattedData = {}

            const response = await fetcher(
              `${process.env.NEXT_PUBLIC_APP_URL}/api/getQuotes`,
              {
                method: "POST",
                headers: { Accept: "application/json" },
                body: JSON.stringify({ tokens: metadata })
              }
            )

            metadata.forEach((currencyMetadata, index) => {
              const results = response.data[currencyMetadata.symbol] // array of currencies with the same key
              const currencyAddress =
                currencyMetadata?.address || missingCurrencies[index]

              if (currencyAddress === ethers.constants.AddressZero) {
                // if it's ETH take the first value of the array
                formattedData[currencyMetadata.symbol] =
                  results[0]?.quote?.USD?.price
              } else {
                results?.forEach((result) => {
                  // check if the currency found by symbol has the correct address,
                  // otherwise it's not the same currency
                  const price =
                    result.platform?.token_address?.toLowerCase() ===
                    currencyAddress.toLowerCase()
                      ? result.quote?.USD.price
                      : 0

                  formattedData[currencyMetadata.symbol] = price
                })
              }
            })

            // Format return data
            currencyData.push({
              id: 0,
              address: missingCurrencies[0],
              name: "Slice",
              createdAt: null,
              updatedAt: null,
              logo: null,
              quote: null,
              cmcId: null,
              symbol: Object.keys(formattedData)[0]
            })

            console.log(currencyData)

            // if (Object.keys(quotes).length && metadata.length) {
            //   currencies?.forEach((currency, index) => {
            //     const currencyMetadata = metadata[index]
            //     formattedData.push({
            //       ...currency,
            //       symbol: currencyMetadata.symbol,
            //       name: currencyMetadata.name,
            //       logo: currencyMetadata.logo,
            //       quote: quotes[currencyMetadata?.symbol]
            //     })
            //   })
            // }

            // // CREATE OR UPDATE CURRENCIES
            // fetcher(
            //   `${process.env.NEXT_PUBLIC_APP_URL}/api/currencies/createOrUpdate`,
            //   {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify({ currencies: formattedData })
            //   }
            // )
            // console.log(test)
          }
        }

        res.status(200).json({ slicerData, currencyData })
      } else {
        const slicerList = await prisma.slicer.findMany({
          where: {
            OR: [{ tags: { not: "Private" } }, { tags: { equals: null } }]
          },
          orderBy: { id: "desc" },
          select: {
            id: true,
            name: true,
            tags: true,
            description: true,
            image: true,
            isImmutable: true
          }
        })
        res.status(200).json(slicerList)
      }
    }
  } catch (err) {
    res.status(500).json(err.message)
  }
}

export default handler

// Todo?: Fix cors for !origin? I can access this from anywhere
