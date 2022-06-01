import React, { Dispatch, SetStateAction } from "react"
import { FilesList, Textarea } from ".."

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
  setFiles
}: Props) => {
  return (
    <>
      <h2 className="pb-6">Purchase info</h2>
      <p className="pb-3">
        Customize what buyers see after buying the product.
      </p>
      <div>
        <Textarea
          label="Message to buyers"
          placeholder="Thank you for buying our product! ❤️"
          value={thankMessage}
          onChange={setThankMessage}
        />
      </div>
      <div>
        <Textarea
          label="Instructions"
          placeholder="How can buyers redeem or use the product?"
          value={instructions}
          onChange={setInstructions}
        />
      </div>
      <div>
        <hr className="w-20 mx-auto border-gray-300 my-14" />
      </div>
      <h2 className="pb-6">Encrypted notes & files</h2>
      <p className="pb-3">
        Add files or notes that can only be decrypted by buyers (increases
        transaction cost).
      </p>
      <div>
        <Textarea
          label="Encrypted Notes"
          placeholder="Additional notes"
          value={notes}
          onChange={setNotes}
        />
      </div>
      <div className="py-6">
        <FilesList title="Upload files" files={files} setFiles={setFiles} />
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
