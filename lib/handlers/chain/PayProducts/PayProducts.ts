import { PurchaseParamsStruct } from "types/typechain/ProductsModule"
import { BigNumber, ethers, Signer } from "ethers"
import { ProductCart } from "@lib/handleUpdateCart"

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
    ? await priceFeed(signer).getQuote(
        10000,
        "0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6",
        "0x2f3a40a3db8a7e3d09b0adfefbce4f6f81927557",
        1800
      )
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
            .mul(BigNumber.from(10).pow(24))
            .div(ethUsd)
            .add(extCallValue)
        : BigNumber.from(price).add(extCallValue)

      purchaseParams.push({
        slicerId,
        quantity,
        currency,
        productId,
        buyerCustomData
      })
      totalPrice = BigNumber.from(currentPrice).add(productPrice)
    })

    const call = await contract.payProducts(buyer, purchaseParams, {
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
