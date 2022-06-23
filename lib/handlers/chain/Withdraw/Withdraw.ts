import { Signer } from "ethers"

const Withdraw = async (signer: Signer, account: string, currency: string) => {
  const { fundsModule } = await import("@lib/initProvider")
  const contract = fundsModule(signer)

  try {
    const call = await contract.withdraw(account, currency)
    return [contract, call]
  } catch (err) {
    throw err
  }
}

export default Withdraw
