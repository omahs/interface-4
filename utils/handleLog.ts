import { LogDescription } from "@ethersproject/abi"
import { Contract, ContractTransaction } from "ethers"

const handleLog = async (contract: Contract, call: ContractTransaction) => {
  const wait = await call.wait()
  const logs = wait.logs
  let eventLogs: LogDescription[] = []
  for (const log of logs) {
    try {
      const eventLog = contract.interface.parseLog(log)
      eventLogs.push(eventLog)
    } catch (err) {
      null
    }
  }
  return eventLogs
}

export default handleLog
