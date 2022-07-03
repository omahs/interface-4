import { BigNumberish, BytesLike, Signer } from "ethers"

export type DeployParams = {
  projectId: BigNumberish
  beneficiary: string
  preferClaimedTokens: boolean
  memo: string
  metadata: BytesLike
  preferAddToBalance: boolean
  directory: string
  owner: string
}

const cloneProjectPayer = async (
  signer: Signer,
  deployParams: DeployParams
) => {
  const { jbCloner } = await import("@lib/initProvider")

  const {
    projectId,
    beneficiary,
    preferClaimedTokens,
    memo,
    metadata,
    preferAddToBalance,
    directory,
    owner
  } = deployParams

  const contract = await jbCloner(signer)

  try {
    const call = await contract.cloneProjectPayer(
      projectId,
      beneficiary,
      preferClaimedTokens,
      memo,
      metadata,
      preferAddToBalance,
      directory,
      owner
    )

    return [contract, call]
  } catch (err) {
    console.log(err)

    throw err
  }
}

export default cloneProjectPayer
