import WalletConnect from "@walletconnect/client"
import { PurchaseParamsStruct } from "types/typechain/ProductsModule"
import { BigNumber, ethers } from "ethers"

export type PayProductData = {
  slicerId: string
  productId: number
  quantity: number
  price: number
  isUSD: boolean
}

const PayProducts = async (
  connector: WalletConnect,
  buyer: string,
  productData: PayProductData[]
) => {
  const { initialize } = await import("@lib/useProvider")
  const { productsModule, chainlink } = await import("@lib/initProvider")

  const { signer } = await initialize(connector)
  const contract = productsModule(signer)
  const priceFeed = await chainlink(signer).latestRoundData()
  const currency = ethers.constants.AddressZero

  const ethUsd = Number(priceFeed[1])
  let totalPrice: BigNumber
  let purchaseParams: PurchaseParamsStruct[] = []

  try {
    productData.forEach((product) => {
      const { slicerId, productId, quantity, price, isUSD } = product
      const currentPrice = totalPrice || 0

      const productPrice = isUSD
        ? BigNumber.from(price)
            .mul(BigNumber.from(10).pow(24))
            .div(ethUsd)
            .mul(quantity)
        : BigNumber.from(price).mul(quantity)

      purchaseParams.push({ slicerId, quantity, currency, productId })
      totalPrice = BigNumber.from(currentPrice).add(productPrice)
    })

    const call = await contract.payProducts(buyer, purchaseParams, {
      value: totalPrice
    })
    return [contract, call]
  } catch (err) {
    throw err
  }
}

export default PayProducts

// TODO: Update so currency can be passed here
// todo?: calculate price here when price edits are possible
