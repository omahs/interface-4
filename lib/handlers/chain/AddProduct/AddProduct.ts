import WalletConnect from "@walletconnect/client"
import {
  FunctionStruct,
  ProductParamsStruct
} from "contracts/typechain-types/ProductsModule"

const AddProduct = async (
  connector: WalletConnect,
  slicerId: number,
  productParams: ProductParamsStruct,
  externalCall: FunctionStruct
) => {
  // const { BigNumber } = await import("ethers")
  const { initialize } = await import("@lib/useProvider")
  const { productsModule } = await import("@lib/initProvider")
  const { signer } = await initialize(connector)
  const contract = productsModule(signer)

  // const decimals = BigNumber.from(10).pow(13)
  // const ethToWei = BigNumber.from(price * 10 ** 5).mul(decimals)
  // const productPrice = isUSD ? price : ethToWei

  try {
    const call = await contract.addProduct(
      slicerId,
      productParams,
      externalCall
    )
    return [contract, call]
  } catch (err) {
    throw err
  }
}

export default AddProduct
