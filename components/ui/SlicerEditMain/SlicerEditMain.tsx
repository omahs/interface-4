import { Dispatch, SetStateAction, useState } from "react"
import Input from "../Input"

type Props = {
  slicerId: string
  name: string
  newName: string
  newPath: string
  setNewName: Dispatch<SetStateAction<string>>
  setNewPath: Dispatch<SetStateAction<string>>
  loading: boolean
}

const SlicerEditMain = ({
  slicerId,
  newName,
  setNewName,
  newPath,
  setNewPath,
  loading
}: Props) => {
  return (
    <>
      <div>
        <Input
          label="Name"
          type="text"
          value={newName}
          onChange={setNewName}
          disabled={loading}
        />
      </div>
      <div className="pt-4">
        <Input
          prefix="slice.so/slicer/"
          label="Custom url"
          placeholder={slicerId}
          type="text"
          value={newPath}
          onChange={setNewPath}
          disabled={loading}
        />
      </div>
    </>
  )
}

export default SlicerEditMain
