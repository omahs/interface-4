import { ethers } from "ethers"

const toWad = (value: number) => {
  return ethers.BigNumber.from(10)
    .pow(15)
    .mul(Math.floor(Number(value) * 1000))
}

export default toWad
