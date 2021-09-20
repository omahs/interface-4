import React, { Dispatch, SetStateAction, useState } from "react"
import { FilesList, Input } from ".."

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
  return (
    <>
      <h2 className="pb-6">Purchases</h2>
      <p>More features will be available in the future</p>
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
      <div className="pt-4">
        <FilesList files={files} loading={loading} setFiles={setFiles} />
      </div>
    </>
  )
}

export default AddProductFormPurchases

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
// - Product Purchase files and data -> web3Storage (encrypted)
