import { ContractInterface, Signer } from "ethers"
import addresses from "addresses.json"
import { cloner } from "@lib/initProvider"

export type DeployParamsClone = {
  slicerId: number
  args: any[]
}

const clone = async (
  clonerAddress: string,
  abi: ContractInterface,
  signer: Signer,
  deployParams: DeployParamsClone
) => {
  const env = process.env.NEXT_PUBLIC_CHAIN_ID === "1" ? "mainnet" : "testnet"
  const productsModule = addresses[env].ProductsModule

  const { slicerId, args } = deployParams

  try {
    const contract = await cloner(clonerAddress, abi, signer)

    const call = await contract.clone(productsModule, slicerId, ...args)
    const wait = await call.wait()
    const cloneAddress = wait.events[0].address

    return cloneAddress
  } catch (err) {
    console.log(err)
  }
}

export default clone
