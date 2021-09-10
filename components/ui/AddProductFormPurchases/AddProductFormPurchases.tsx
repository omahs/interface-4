import { Dispatch, SetStateAction } from "react"
import Input from "../Input"

type Props = {
  setPurchaseData: Dispatch<SetStateAction<[]>>
}

const AddProductFormPurchases = ({ setPurchaseData }: Props) => {
  return (
    <>
      <h2 className="pb-6">Purchases</h2>
      <p></p>
      {/* Todo: Add purchase data */}
    </>
  )
}

export default AddProductFormPurchases

// What can be bought
// 1. One or more files
//    - Upload files from frontend, like the image
//    - upload files (encrypted with dynamic key) on web3Storage -> get ipfs hash
//    - pin json with file hashes + encrypted metadata (name, descr, notes, etc)
//    - send pinned Json hash as purchaseData bytes3d param

// Other kinds of purchase data
// - A link of some sort? Webhook? What else?
// - dynamic data, id, etc
// - generate coupon code
// - Additional text info

// To consider?
//  - stream of money (the guy who contacted me)

// ---------------------------------------

// Storage options
// - supabase (storage and centralised db)
// - pinata (JSON ipfs metadata)
// - web3Storage (files on ipfs)
//

// STORING FILES
// - slicer images -> supabase (mutable)
// - slicer images (Collectible) -> Immutable (think of improvements)
//
// - Product data -> pinata JSON (+ partially on supabase for more performant views)
// - Product data image -> supabase (more performant views on website than storing on ipfs, kinda centralized but also not critical for it to be truly immutable)
//
// - Product Purchase files -> web3Storage (encrypted)
// - Product Purchase data -> pinata JSON
