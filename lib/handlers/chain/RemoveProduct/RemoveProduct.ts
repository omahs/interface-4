import { Signer } from "ethers"

const RemoveProduct = async (
  signer: Signer,
  slicerId: number,
  productId: number
) => {
  const { productsModule } = await import("@lib/initProvider")
  const contract = productsModule(signer)

  try {
    const call = await contract.removeProduct(slicerId, productId)
    return [contract, call]
  } catch (err) {
    throw err
  }
}

export default RemoveProduct
