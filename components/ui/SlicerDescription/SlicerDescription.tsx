import { Dispatch, SetStateAction, useState } from "react"
import Input from "../Input"

type Props = {
  description: string
  newDescription: string
  setNewDescription: Dispatch<SetStateAction<string>>
  editMode: boolean
  loading: boolean
}

const SlicerDescription = ({
  description,
  newDescription,
  setNewDescription,
  editMode,
  loading,
}: Props) => {
  return (
    <div className="py-2">
      {editMode ? (
        <Input
          label="Description"
          type="text"
          value={newDescription}
          onChange={setNewDescription}
          disabled={loading}
        />
      ) : (
        <p className="text-lg font-semibold sm:text-xl">{description}</p>
      )}
    </div>
  )
}

export default SlicerDescription
