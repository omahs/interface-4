import { Signer } from "ethers"

const releaseEthToSlicer = async (signer: Signer, slicerId: number) => {
  const { productsModule } = await import("@lib/initProvider")
  const contract = productsModule(signer)

  try {
    const call = await contract.releaseEthToSlicer(slicerId)
    return [contract, call]
  } catch (err) {
    throw err
  }
}

export default releaseEthToSlicer
