import { utils } from "ethers"

const formatCalldata = (...data: string[]) => {
  let formattedCalldata = ""

  data.forEach((d) => {
    formattedCalldata += utils.hexZeroPad(d, 32).substring(2)
  })
  return formattedCalldata
}

export default formatCalldata
