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
  return editMode ? (
    <div className="pt-4">
      <Input
        label="Description"
        type="text"
        value={newDescription}
        onChange={setNewDescription}
        disabled={loading}
      />
    </div>
  ) : (
    <p className="text-lg font-semibold sm:text-xl">{description}</p>
  )
}

export default SlicerDescription
