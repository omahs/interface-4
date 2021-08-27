import { Dispatch, SetStateAction, useState } from "react"
import Button from "../Button"
import Input from "../Input"

type Props = {
  slicerId: string
  editMode: boolean
}

const SlicerProducts = ({ slicerId, editMode }: Props) => {
  return !editMode ? (
    <p>There are no products</p>
  ) : (
    <div>
      <p className="pb-4 text-lg">There are no products</p>
      <Button label="Add a product" href={`${slicerId}/products/new`} />
      <hr className="mt-12" />
    </div>
  )
}

export default SlicerProducts
