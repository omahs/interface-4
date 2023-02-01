import { BigNumber } from "ethers"

const ethToWei = (ethValue: number) => {
  try {
    const decimals = BigNumber.from(10).pow(9)
    return BigNumber.from((ethValue * 10 ** 9).toFixed(0)).mul(decimals)
  } catch (error) {
    console.log(error)
    return 0
  }
}

export default ethToWei
