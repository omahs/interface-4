"use client"

import { ethers } from "ethers"
import { useContractRead } from "wagmi"
import { priceFeedAddress } from "@lib/initProvider"
import PriceFeedContract from "artifacts/contracts/PriceFeed.sol/PriceFeed.json"

const chainId = process.env.NEXT_PUBLIC_CHAIN_ID

export const quoteParams = [
  ethers.BigNumber.from(10).pow(18), // 1 eth
  chainId == "5"
    ? "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6"
    : "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", // ETH
  chainId == "5"
    ? "0x07865c6E87B9F70255377e024ace6630C1Eaa37F"
    : "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", // USDC
  1800 // TWAP Interval
]

export default function useEthUsd() {
  const params = {
    address: priceFeedAddress,
    abi: PriceFeedContract.abi,
    functionName: "getQuote",
    args: quoteParams,
    watch: true
  }
  // {
  //     address: chainlinkFeedAddress,
  //     abi: ChainlinkContract.abi,
  //     functionName: "latestRoundData",
  //     args: [],
  //     watch: true
  //   }

  const calldata = useContractRead(params)

  return calldata?.data && Number(calldata?.data) / 1e6
  // Chainlink: calldata?.data && Number(calldata?.data[1]) / 1e8
}
