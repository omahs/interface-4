import { ethers } from "ethers"
import SliceCoreContract from "artifacts/contracts/SliceCore.sol/SliceCore.json"
import ProductsModuleContract from "artifacts/contracts/ProductsModule.sol/ProductsModule.json"
import FundsModuleContract from "artifacts/contracts/FundsModule.sol/FundsModule.json"
import SlicerContract from "artifacts/contracts/Slicer.sol/Slicer.json"
import ChainlinkContract from "artifacts/@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol/AggregatorV3Interface.json"

export const sliceCore = (signer: ethers.Signer | ethers.providers.Provider) =>
  new ethers.Contract(
    process.env.NEXT_PUBLIC_SLICECORE_ADDRESS,
    SliceCoreContract.abi,
    signer
  )
export const productsModule = (
  signer: ethers.Signer | ethers.providers.Provider
) =>
  new ethers.Contract(
    process.env.NEXT_PUBLIC_PRODUCTS_ADDRESS,
    ProductsModuleContract.abi,
    signer
  )
export const fundsModule = (
  signer: ethers.Signer | ethers.providers.Provider
) =>
  new ethers.Contract(
    process.env.NEXT_PUBLIC_FUNDS_ADDRESS,
    FundsModuleContract.abi,
    signer
  )

export const slicer = async (
  slicerId: number,
  signer: ethers.Signer | ethers.providers.Provider
) => {
  const slicerAddress = await sliceCore(signer).slicers(slicerId)
  return new ethers.Contract(slicerAddress, SlicerContract.abi, signer)
}

export const chainlink = (signer: ethers.Signer | ethers.providers.Provider) =>
  new ethers.Contract(
    process.env.NEXT_PUBLIC_CHAINLINK_FEED,
    ChainlinkContract.abi,
    signer
  )

// export const gasPrice = { gasPrice: 1000000000 }
