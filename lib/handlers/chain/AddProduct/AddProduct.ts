import WalletConnect from "@walletconnect/client"
import {
  FunctionStruct,
  ProductParamsStruct
} from "types/typechain/ProductsModule"

const AddProduct = async (
  connector: WalletConnect,
  slicerId: number,
  productParams: ProductParamsStruct,
  externalCall: FunctionStruct
) => {
  const { initialize } = await import("@lib/useProvider")
  const { productsModule } = await import("@lib/initProvider")
  const { signer } = await initialize(connector)
  const contract = productsModule(signer)

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
