import { Dispatch, SetStateAction, useEffect } from "react"
import { FileSubmit } from "@components/ui"

type Props = {
  files: File[]
  setFiles: Dispatch<SetStateAction<File[]>>
}

const FilesList = ({ files, setFiles }: Props) => {
  return files ? (
    <>
      {files.map((el, key) => {
        const i = Number(key)

        return (
          <div key={key}>
            <FileSubmit
              index={i}
              file={files[i]}
              files={files}
              setFiles={setFiles}
            />
            {i + 1 != files.length && (
              <hr className="w-20 mx-auto my-16 border-gray-300" />
            )}
          </div>
        )
      })}
    </>
  ) : (
    <p>Add a file to submit the product</p>
  )
}

export default FilesList
