import { Signer } from "ethers"

const TriggerRelease = async (
  signer: Signer,
  slicerId: number,
  account: string,
  currency: string,
  toWithdraw: boolean
) => {
  const { slicer } = await import("@lib/initProvider")
  const contract = await slicer(slicerId, signer)

  try {
    const call = await contract.release(account, currency, toWithdraw)
    return [contract, call]
  } catch (err) {
    throw err
  }
}

export default TriggerRelease
