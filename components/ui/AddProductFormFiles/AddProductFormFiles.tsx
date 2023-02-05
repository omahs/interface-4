import React, { Dispatch, SetStateAction } from "react"
import { FilesList, Textarea } from ".."

type Props = {
  notes: string
  setNotes: Dispatch<SetStateAction<string>>
  files: File[]
  setFiles: Dispatch<SetStateAction<File[]>>
}

const AddProductFormFiles = ({ notes, setNotes, files, setFiles }: Props) => {
  return (
    <>
      <div className="pb-10">
        <h1 className="pb-6">Encrypted notes & files</h1>
        <p className="text-lg text-gray-600">
          Upload texts and files that can only be downloaded by buyers
        </p>
      </div>
      <div>
        <Textarea
          label="Encrypted Notes"
          placeholder="Additional notes"
          value={notes}
          onChange={setNotes}
          rows={4}
        />
      </div>
      <div className="py-6">
        <FilesList title="Upload files" files={files} setFiles={setFiles} />
      </div>
    </>
  )
}

export default AddProductFormFiles
