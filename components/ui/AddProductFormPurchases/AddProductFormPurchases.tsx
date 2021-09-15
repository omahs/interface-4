import React, { Dispatch, SetStateAction, useRef, useState } from "react"
import { Button, FilesList, Input } from ".."

type Props = {
  thankMessage: string
  setThankMessage: Dispatch<SetStateAction<string>>
  instructions: string
  setInstructions: Dispatch<SetStateAction<string>>
  notes: string
  setNotes: Dispatch<SetStateAction<string>>
  files: File[]
  setFiles: Dispatch<SetStateAction<File[]>>
}

const AddProductFormPurchases = ({
  thankMessage,
  setThankMessage,
  instructions,
  setInstructions,
  notes,
  setNotes,
  files,
  setFiles,
}: Props) => {
  const [loading, setLoading] = useState(false)
  const uploadEl = useRef(null)

  const uploadFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = [...e.target.files]
    if (files.length !== 0) {
      setFiles([
        ...files,
        ...uploadedFiles.filter((file) => {
          let included
          files.forEach((el) => {
            if (file.name == el.name && file.size == el.size) {
              included = true
            }
          })
          return !included
        }),
      ])
    } else {
      setFiles([...e.target.files])
    }
  }
  return (
    <>
      <h2 className="pb-6">Purchases</h2>
      <p>
        You can upload one or more files that the buyer will redeem on a
        successful purchase
      </p>
      <p>More features will be available in the future</p>
      <p>
        Files are saved immutably on IPFS, and encrypted so that only those who
        buy them can see their content. Learn more about this in our FAQs.
      </p>
      <div>
        <Input
          label="Message to buyers"
          type="string"
          value={thankMessage}
          onChange={setThankMessage}
          required
        />
      </div>
      <div>
        <Input
          label="Instructions"
          type="string"
          value={instructions}
          onChange={setInstructions}
          required
        />
      </div>
      <div>
        <Input
          label="Notes"
          type="string"
          value={notes}
          onChange={setNotes}
          required
        />
      </div>
      {/* Todo: Add purchase data */}
      <FilesList files={files} setFiles={setFiles} />
      <div>
        <label ref={uploadEl} htmlFor="purchaseFiles">
          <Button
            label="Add files"
            type="button"
            onClick={() => uploadEl.current.click()}
          />
        </label>
        <input
          className="absolute hidden"
          type="file"
          id="purchaseFiles"
          accept="*"
          onChange={(e) => uploadFiles(e)}
          disabled={loading}
          multiple
        />
      </div>
    </>
  )
}

export default AddProductFormPurchases

// What can be bought
// 1. One or more files
//    - OK Upload files from frontend, like the image
//    - OK upload files (encrypted with dynamic key) on web3Storage -> get ipfs hash
//    - OK pin json with file hashes + encrypted metadata (name, descr, notes, etc)
//    - OK send pinned Json hash as purchaseData bytes3d param
//    - Fix encryption process

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
