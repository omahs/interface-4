import { ethers } from "ethers"
import SLCContract from "artifacts/contracts/slc_v0.sol/SLC.json"
import SliceCoreContract from "artifacts/contracts/sliceCore_v0.sol/SliceCore.json"
import SliceContract from "artifacts/contracts/slice_v0.sol/Slice.json"
import SlicerContract from "artifacts/contracts/slicer_v0.sol/Slicer.json"
import ChainlinkContract from "artifacts/@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol/AggregatorV3Interface.json"

export const slc = (signer: ethers.Signer | ethers.providers.Provider) =>
  new ethers.Contract(
    process.env.NEXT_PUBLIC_SLC_ADDRESS,
    SLCContract.abi,
    signer
  )
export const sliceCore = (signer: ethers.Signer | ethers.providers.Provider) =>
  new ethers.Contract(
    process.env.NEXT_PUBLIC_SLICECORE_ADDRESS,
    SliceCoreContract.abi,
    signer
  )
export const slice = (signer: ethers.Signer | ethers.providers.Provider) =>
  new ethers.Contract(
    process.env.NEXT_PUBLIC_SLICE_ADDRESS,
    SliceContract.abi,
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
