import { BigNumber } from "ethers"

const ethToWei = (ethValue: number) => {
  const decimals = BigNumber.from(10).pow(9)
  return BigNumber.from((ethValue * 10 ** 9).toFixed(0)).mul(decimals)
}

export default ethToWei
