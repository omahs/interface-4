import { PurchaseParamsStruct } from "types/typechain/ProductsModule"
import { BigNumber, ethers, Signer } from "ethers"
import { ProductCart } from "@lib/handleUpdateCart"
import { quoteParams } from "@utils/useEthUsd"

const PayProducts = async (
  signer: Signer,
  buyer: string,
  productData: ProductCart[]
) => {
  const { productsModule, priceFeedAddress, priceFeed, chainlink } =
    await import("@lib/initProvider")

  const contract = productsModule(signer)

  // chainlink is used in testnet environment where uniswap pool is inactive
  const quote = priceFeedAddress
    ? await priceFeed(signer).getQuote(...quoteParams)
    : await chainlink(signer).latestRoundData()
  const currency = ethers.constants.AddressZero

  const ethUsd = priceFeedAddress ? quote : Number(quote[1])
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
            .mul(BigNumber.from(10).pow(priceFeedAddress ? 18 : 24))
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

    const call = await contract.payProducts(purchaseParams, {
      value: totalPrice
    })

    return [contract, call]
  } catch (err) {
    console.log(err)

    throw err
  }
}

export default PayProducts

// TODO: Update so currency can be passed here
