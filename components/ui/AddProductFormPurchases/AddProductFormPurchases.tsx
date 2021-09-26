import React, { Dispatch, SetStateAction, useState } from "react"
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
  setFiles,
}: Props) => {
  const [loading, setLoading] = useState(false)
  return (
    <>
      <h2 className="pb-6">Purchases</h2>
      <p className="pb-3">
        This section describes what buyers will receive after buying this
        product.
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
          required={files.length == 0}
        />
      </div>
      <div>
        <Textarea
          label="Notes"
          placeholder="Additional notes"
          value={notes}
          onChange={setNotes}
        />
      </div>
      <div className="py-6">
        <FilesList
          title="Upload files"
          files={files}
          loading={loading}
          setFiles={setFiles}
        />
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
