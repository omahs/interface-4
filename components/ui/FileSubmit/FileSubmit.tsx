import Cross from "@components/icons/Cross"
import File from "@components/icons/File"
import FileText from "@components/icons/FileText"
import FileImage from "@components/icons/FileImage"
import { Dispatch, SetStateAction } from "react"
import Delete from "@components/icons/Delete"

type Props = {
  index: number
  file: File
  files: File[]
  setFiles: Dispatch<SetStateAction<File[]>>
}

const FileSubmit = ({ index, file, files, setFiles }: Props) => {
  const filetype = file.type.includes("pdf") ? "PDF" : file.type.split("/")[0]

  const removeFile = () => {
    setFiles(files.filter((file) => file !== files[index]))
  }

  return (
    <div className="grid items-center grid-cols-6 mb-6 border border-gray-100 shadow-base rounded-xl h-14">
      <div className="flex justify-center" title={filetype}>
        {filetype === "image" ? (
          <FileImage />
        ) : filetype === "text" ? (
          <FileText />
        ) : (
          <File />
        )}
      </div>
      <p className="col-span-4 px-1 overflow-hidden text-sm text-left overflow-ellipsis">
        {file.name}
      </p>
      <div className="flex justify-center">
        <Delete onClick={() => removeFile()} />
      </div>
    </div>
  )
}

export default FileSubmit
