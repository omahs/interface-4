import Cross from "@components/icons/Cross"
import { Dispatch, SetStateAction } from "react"

type Props = {
  index: number
  file: File
  files: File[]
  setFiles: Dispatch<SetStateAction<File[]>>
}

const FileSubmit = ({ index, file, files, setFiles }: Props) => {
  const removeFile = () => {
    setFiles(files.filter((file) => file !== files[index]))
  }
  return (
    <div className="grid grid-cols-6 bg-gray-200">
      <p className="col-span-1">{file.type.split("/")[0]}</p>
      <p className="col-span-4">{file.name}</p>
      <p className="flex justify-center col-span-1">
        <a className="underline" onClick={() => removeFile()}>
          <Cross />
        </a>
      </p>
    </div>
  )
}

export default FileSubmit
