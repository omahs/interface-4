import useDecodeShortcode, { ReducedShortcode } from "@utils/useDecodeShortcode"
import React, { Dispatch, SetStateAction } from "react"
import { Shortcodes, Textarea } from ".."

type Props = {
  slicerId: number
  thankMessage: string
  setThankMessage: Dispatch<SetStateAction<string>>
  instructions: string
  setInstructions: Dispatch<SetStateAction<string>>
  customShortcodes: ReducedShortcode
  setCustomShortcodes: Dispatch<SetStateAction<ReducedShortcode>>
}

const AddProductFormPurchases = ({
  slicerId,
  thankMessage,
  setThankMessage,
  instructions,
  setInstructions,
  customShortcodes,
  setCustomShortcodes
}: Props) => {
  const decodedInstructions = useDecodeShortcode(
    "buyerAddress",
    "0",
    String(slicerId),
    "0",
    instructions
  )

  return (
    <>
      <div className="pb-6">
        <h1 className="pb-6">Redeem info</h1>
        <p className="text-lg text-gray-600">
          Customize what buyers see after buying the product
        </p>
      </div>
      <div>
        <Textarea
          label="Message to buyers"
          placeholder="Thank you for buying our product! ❤️"
          value={thankMessage}
          onChange={setThankMessage}
          rows={4}
        />
      </div>
      <div>
        <Textarea
          label="Instructions"
          placeholder="How can buyers redeem or use the product?"
          value={instructions}
          previewValue={decodedInstructions}
          onChange={setInstructions}
          rows={4}
        />
      </div>
      <Shortcodes
        customShortcodes={customShortcodes}
        setCustomShortcodes={setCustomShortcodes}
        instructions={instructions}
        setInstructions={setInstructions}
      />
    </>
  )
}

export default AddProductFormPurchases

// Other kinds of purchase data
// - A link of some sort? Webhook? What else?
// - Additional text info
