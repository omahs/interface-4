"use client"

import { ethers } from "ethers"
import { useContractRead } from "wagmi"
import { chainlinkFeedAddress, priceFeedAddress } from "@lib/initProvider"
import PriceFeedContract from "artifacts/contracts/PriceFeed.sol/PriceFeed.json"
import ChainlinkContract from "artifacts/@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol/AggregatorV3Interface.json"

export const quoteParams = [
  ethers.BigNumber.from(10).pow(18), // 1 eth
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", // ETH
  "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", // USDC
  1800 // TWAP Interval
]

export default function useEthUsd() {
  const params = priceFeedAddress
    ? {
        address: priceFeedAddress,
        abi: PriceFeedContract.abi,
        functionName: "getQuote",
        args: quoteParams,
        watch: true
      }
    : {
        address: chainlinkFeedAddress,
        abi: ChainlinkContract.abi,
        functionName: "latestRoundData",
        args: [],
        watch: true
      }

  const calldata = useContractRead(params)

  return calldata?.data && priceFeedAddress
    ? Number(calldata?.data) / 1e6
    : calldata?.data && Number(calldata?.data[1]) / 1e8
}
