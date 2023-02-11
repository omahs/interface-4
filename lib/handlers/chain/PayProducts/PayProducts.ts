import { PurchaseParamsStruct } from "types/typechain/ProductsModule"
import { BigNumber, ethers, Signer } from "ethers"
import { ProductCart } from "@lib/handleUpdateCart"
import { quoteParams } from "@utils/useEthUsd"

const PayProducts = async (
  signer: Signer,
  buyer: string,
  productData: ProductCart[]
) => {
  const { productsModule, priceFeed } = await import("@lib/initProvider")

  const contract = productsModule(signer)

  const quote = await priceFeed(signer).getQuote(...quoteParams) // Chainlink (scaled x6): await chainlink(signer).latestRoundData()
  const currency = ethers.constants.AddressZero

  const ethUsd = quote // Chainlink: Number(quote[1])
  let totalPrice: BigNumber
  let purchaseParams: PurchaseParamsStruct[] = []

  try {
    productData.forEach((product) => {
      const {
        slicerId,
        productId,
        quantity,
        price,
        isUSD,
        extCallValue,
        buyerCustomData
      } = product

      const currentPrice = totalPrice || 0
      const productPrice = isUSD
        ? BigNumber.from(price)
            .mul(BigNumber.from(10).pow(18)) // chainlink -> pow(24)
            .mul(102) // 2% overpayment to compensate for price fluctuations (repaid to buyer during tx)
            .div(100)
            .div(ethUsd)
            .add(extCallValue)
        : BigNumber.from(price).add(extCallValue)

      purchaseParams.push({
        buyer,
        slicerId,
        quantity,
        currency,
        productId,
        buyerCustomData
      })
      totalPrice = BigNumber.from(currentPrice).add(productPrice)
    })

    const estimate = await contract.estimateGas.payProducts(purchaseParams, {
      value: totalPrice
    })

    const call = await contract.payProducts(purchaseParams, {
      value: totalPrice,
      gasLimit: estimate.mul(106).div(100)
    })

    return [contract, call]
  } catch (err) {
    console.log(err)

    throw err
  }
}

export default PayProducts

// TODO: Update so currency can be passed here
