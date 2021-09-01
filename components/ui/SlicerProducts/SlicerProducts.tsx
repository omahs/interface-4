import { Dispatch, SetStateAction, useState } from "react"
import Button from "../Button"
import Input from "../Input"

type Props = {
  slicerId: string
  editMode: boolean
}

const SlicerProducts = ({ slicerId, editMode }: Props) => {
  return (
    <>
      {/* <ProductGrid/> */}
      {editMode && (
        <div>
          <Button label="Add a product" href={`${slicerId}/products/new`} />
          <hr className="w-16 mx-auto mt-16 border-gray-300" />
        </div>
      )}
    </>
  )
}

export default SlicerProducts
