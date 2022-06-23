import { Signer } from "ethers"
import {
  FunctionStruct,
  ProductParamsStruct
} from "types/typechain/ProductsModule"

const AddProduct = async (
  signer: Signer,
  slicerId: number,
  productParams: ProductParamsStruct,
  externalCall: FunctionStruct
) => {
  const { productsModule } = await import("@lib/initProvider")
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
