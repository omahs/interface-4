import { Signer } from "ethers"

const Slice = async (
  signer: Signer,
  payees: {
    account: string
    shares: number
  }[],
  minimumShares: number,
  currencies: string[],
  releaseTimelock: number,
  transferableTimelock: number,
  isImmutable: boolean,
  isControlled: boolean
) => {
  const { sliceCore } = await import("@lib/initProvider")
  const contract = sliceCore(signer)

  try {
    const call = await contract.slice(
      payees,
      minimumShares,
      currencies,
      releaseTimelock,
      transferableTimelock,
      isImmutable,
      isControlled
    )

    return [contract, call]
  } catch (err) {
    throw err
  }
}

export default Slice
