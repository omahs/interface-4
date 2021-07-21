import { Dispatch, SetStateAction, useState } from "react"
import Input from "../Input"

type Props = {
  name: string
  newName: string
  setNewName: Dispatch<SetStateAction<string>>
  editMode: boolean
  loading: boolean
}

const SlicerName = ({ newName, setNewName, editMode, loading }: Props) => {
  return editMode ? (
    <Input
      label="Name"
      type="text"
      value={newName}
      onChange={setNewName}
      disabled={loading}
    />
  ) : null
}

export default SlicerName
