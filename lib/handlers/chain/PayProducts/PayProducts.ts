import WalletConnect from "@walletconnect/client"
import { BigNumber } from "ethers"
import { initialize } from "@lib/useProvider"
import { slice, chainlink } from "@lib/initProvider"

export type PayProductData = {
  slicerAddress: string
  productId: number
  quantity: number
  price: number
  isUSD: boolean
}

const PayProducts = async (
  connector: WalletConnect,
  productData: PayProductData[]
) => {
  const { signer } = await initialize(connector)
  const contract = slice(signer)
  const priceFeed = await chainlink(signer).latestRoundData()

  const ethUsd = Number(priceFeed[1])
  let slicerAddresses: string[] = []
  let productIds: number[] = []
  let quantities: number[] = []
  let totalPrice: BigNumber

  try {
    productData.forEach((product) => {
      const { slicerAddress, productId, quantity, price, isUSD } = product
      const currentPrice = totalPrice || 0
      slicerAddresses.push(slicerAddress)
      productIds.push(productId)
      quantities.push(quantity)

      const productPrice = isUSD
        ? BigNumber.from(price)
            .mul(BigNumber.from(10).pow(24))
            .div(ethUsd)
            .mul(quantity)
        : BigNumber.from(price).mul(quantity)

      totalPrice = BigNumber.from(currentPrice).add(productPrice)
    })

    const call = await contract.payProducts(
      slicerAddresses,
      productIds,
      quantities,
      {
        value: totalPrice,
      }
    )
    return [contract, call]
  } catch (err) {
    throw err
  }
}

export default PayProducts

// todo?: calculate price here when price edits are possible
