import { Dispatch, SetStateAction, useEffect, useRef } from "react"
import { Button, FileSubmit } from "@components/ui"
import FilePlus from "@components/icons/FilePlus"

type Props = {
  files: File[]
  loading: boolean
  setFiles: Dispatch<SetStateAction<File[]>>
}

const FilesList = ({ files, setFiles, loading }: Props) => {
  const uploadEl = useRef(null)

  const uploadFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = [...e.target.files]
    if (files.length !== 0) {
      setFiles([
        ...files,
        ...uploadedFiles.filter((file) => {
          let included: boolean
          files.forEach((el) => {
            if (file.name == el.name && file.size == el.size) {
              included = true
            }
          })
          return !included
        }),
      ])
    } else {
      setFiles([...e.target.files])
    }
  }

  return (
    <div className="px-2 py-6 bg-white rounded-lg shadow-lg sm:px-6">
      <h3 className="pt-2 pb-8 font-bold">Upload files</h3>
      {files.length != 0 ? (
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
              </div>
            )
          })}
        </>
      ) : (
        <>
          <p className="pb-2">
            Upload one or more files that buyers will redeem on a successful
            purchase.
          </p>
        </>
      )}
      <div className="py-4">
        <label ref={uploadEl} htmlFor="purchaseFiles">
          <Button
            label={
              <>
                Add files
                <FilePlus className="inline-block ml-1 pl-0.5" />
              </>
            }
            type="button"
            onClick={() => uploadEl.current.click()}
          />
        </label>
        <p className="pt-8 text-sm">
          Files are saved immutably on IPFS, and encrypted so that only those
          who buy them can see their content.{" "}
          <a className="highlight">Learn more</a> in our FAQs.
        </p>
        <input
          className="absolute hidden"
          type="file"
          id="purchaseFiles"
          accept="*"
          onChange={(e) => uploadFiles(e)}
          disabled={loading}
          multiple
        />
      </div>
    </div>
  )
}

export default FilesList
