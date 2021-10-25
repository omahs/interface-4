import WalletConnect from "@walletconnect/client"

const AddProduct = async (
  connector: WalletConnect,
  slicerId: number,
  categoryIndex: number,
  price: number,
  isUSD: boolean,
  isMultiple: boolean,
  isInfinite: boolean,
  units: number,
  data: string | object = [],
  purchaseData: string | object = [],
  subSlicersIds = [],
  subProducts = []
) => {
  const { BigNumber } = await import("ethers")
  const { initialize } = await import("@lib/useProvider")
  const { slicer } = await import("@lib/initProvider")

  const { signer } = await initialize(connector)
  const contract = await slicer(slicerId, signer)
  const decimals = BigNumber.from(10).pow(13)
  const ethToWei = BigNumber.from(price * 10 ** 5).mul(decimals)
  const productPrice = isUSD ? price : ethToWei

  try {
    const call = await contract.addProduct(
      categoryIndex,
      productPrice,
      isUSD,
      isMultiple,
      isInfinite,
      units,
      data,
      purchaseData,
      subSlicersIds,
      subProducts
    )
    return [contract, call]
  } catch (err) {
    throw err
  }
}

export default AddProduct
