import { LogDescription } from "ethers/lib/utils"

const getLog = (logs: LogDescription[], filter: string) => {
  const log = logs?.filter((log) => log.name === filter)
  return log && log[0]?.args
}

export default getLog
