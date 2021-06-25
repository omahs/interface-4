import { ethers } from "ethers"
import SLCContract from "artifacts/contracts/slice.sol/SLC.json"
import SliceCoreContract from "artifacts/contracts/slice.sol/SliceCore.json"
import SliceContract from "artifacts/contracts/slice.sol/Slice.json"
import SlicerContract from "artifacts/contracts/slice.sol/Slicer.json"
// import fetcher from "@utils/fetcher"

// const baseUrl = process.env.NEXTAUTH_URL

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

export const gasPrice = { gasPrice: 1000000000 }
