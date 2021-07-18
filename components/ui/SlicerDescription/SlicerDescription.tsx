import { Dispatch, SetStateAction, useState } from "react"
import Input from "../Input"

type Props = {
  description: string
  newDescription: string
  setNewDescription: Dispatch<SetStateAction<string>>
  editMode: boolean
}

const SlicerDescription = ({
  description,
  newDescription,
  setNewDescription,
  editMode,
}: Props) => {
  return (
    <div className="pt-8">
      {editMode ? (
        <Input
          label="Description"
          type="text"
          value={newDescription}
          onChange={setNewDescription}
        />
      ) : (
        <p className="text-xl font-semibold">{description}</p>
      )}
    </div>
  )
}

export default SlicerDescription
