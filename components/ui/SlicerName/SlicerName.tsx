import { Dispatch, SetStateAction, useState } from "react"
import Input from "../Input"

type Props = {
  name: string
  newName: string
  setNewName: Dispatch<SetStateAction<string>>
  editMode: boolean
}

const SlicerName = ({ newName, setNewName, editMode }: Props) => {
  return editMode ? (
    <div className="pt-8">
      <Input label="Name" type="text" value={newName} onChange={setNewName} />
    </div>
  ) : null
}

export default SlicerName
