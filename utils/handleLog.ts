import { Contract } from "ethers"

const handleLog = async (contract: Contract, call: any) => {
  const wait = await call.wait()
  const logs = wait.logs
  const eventLog = contract.interface.parseLog(logs[logs.length - 1])
  return eventLog
}

export default handleLog
