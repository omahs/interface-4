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
// Make it generalizable from the start!
