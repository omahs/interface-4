import { Dispatch, SetStateAction } from "react"
import Input from "../Input"

type Props = {
  setPurchaseData: Dispatch<SetStateAction<[]>>
}

const AddProductFormPurchases = ({ setPurchaseData }: Props) => {
  return (
    <>
      <h2 className="pb-6">Purchases</h2>
      {/* Todo: Add purchase data */}
    </>
  )
}

export default AddProductFormPurchases
