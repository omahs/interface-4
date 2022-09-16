import { useEffect, useState } from "react"
import multicall from "@utils/multicall"
import formatCalldata from "@utils/formatCalldata"
import { ethers } from "ethers"

export const getExternalPrices = async (
  addresses: string[],
  args: string[],
  ids: [number, number][]
) => {
  const returnedPrices = {}
  const result = await multicall(
    addresses,
    "productPrice(uint256,uint256,address,uint256,address,bytes)",
    args,
    false
  )

  ids.forEach(([slicerId, productId], i) => {
    const [ethPrice, currencyPrice] = [
      result[i].slice(2, 66),
      result[i].slice(66)
    ]
    if (!returnedPrices[slicerId]) returnedPrices[slicerId] = {}
    returnedPrices[slicerId][productId] = {
      [ethers.constants.AddressZero]: {
        ethPrice,
        currencyPrice
      }
    }
  })

  return returnedPrices
}

const useExternalPrices = (account: string, products: any) => {
  const [prices, setPrices] = useState({})

  useEffect(() => {
    const ids = []
    const addresses = []
    const args = []

    if (products) {
      products.forEach((product) => {
        if (
          product.prices.length != 0 &&
          product.prices[0].externalAddress != "0x00000000" &&
          product.prices[0].externalAddress != ethers.constants.AddressZero
        ) {
          const [slicerId, productId] = product.id.split("-")
          ids.push([Number(slicerId), Number(productId)])
          addresses.push(product.prices[0].externalAddress)
          args.push(
            formatCalldata(
              slicerId,
              productId,
              ethers.constants.AddressZero,
              "0x1",
              account || ethers.constants.AddressZero,
              "0x"
            )
          )
        }
      })
    }
    const intervalId = setInterval(async () => {
      if (args.length != 0) {
        setPrices(await getExternalPrices(addresses, args, ids))
      }
    }, 24000)

    return () => {
      clearInterval(intervalId)
    }
  }, [products])

  return prices
}

export default useExternalPrices
