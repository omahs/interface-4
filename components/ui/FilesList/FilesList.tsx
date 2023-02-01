import Link from "next/link"
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { Button, FileSubmit, MessageBlock } from "@components/ui"
import FilePlus from "@components/icons/FilePlus"
import handleMessage, { Message } from "@utils/handleMessage"

type Props = {
  title: string
  files: File[]
  setFiles?: Dispatch<SetStateAction<File[]>>
  uploadable?: boolean
  downloadable?: boolean
  backgroundColor?: string
}

const FilesList = ({
  title,
  files,
  setFiles,
  uploadable = true,
  backgroundColor,
  downloadable
}: Props) => {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<Message>({
    message: "",
    messageStatus: "success"
  })
  const uploadEl = useRef(null)

  const uploadFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true)
    let execute = true
    const uploadedFiles = [...e.target.files]
    uploadedFiles.map((file) => {
      if (file.size > 134217728 /* 128MB */) {
        execute = false
        handleMessage(
          {
            message: "File too big (max 128 MB)",
            messageStatus: "error"
          },
          setMessage
        )
        setFiles([])
      }
    })
    if (execute) {
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
          })
        ])
      } else {
        setFiles([...e.target.files])
      }
    }
    setLoading(false)
  }

  return (
    <div
      className={`px-2 py-6 ${
        backgroundColor || "bg-white"
      } rounded-lg shadow-lg sm:px-6`}
    >
      <h3 className="pt-2 pb-8 font-bold">{title}</h3>
      {files.length != 0 ? (
        <>
          {files.map((el, key) => {
            const i = Number(key)
            const href = downloadable && URL.createObjectURL(files[i])

            return downloadable ? (
              <a key={key} href={href} download={files[i].name}>
                <FileSubmit
                  index={i}
                  file={files[i]}
                  files={files}
                  setFiles={setFiles}
                  downloadable={downloadable}
                />
              </a>
            ) : (
              <div key={key}>
                <FileSubmit
                  index={i}
                  file={files[i]}
                  files={files}
                  setFiles={setFiles}
                  downloadable={downloadable}
                />
              </div>
            )
          })}
        </>
      ) : (
        <>
          <p className="pb-4">
            Buyers will be able to download them after purchase.
          </p>
        </>
      )}
      {uploadable && (
        <div className="py-4">
          <label ref={uploadEl} htmlFor="purchaseFiles">
            <Button
              label={
                <>
                  Add files
                  <FilePlus className="inline-block ml-1 pl-0.5" />
                </>
              }
              loading={loading}
              type="button"
              onClick={() => uploadEl.current.click()}
            />
          </label>
          <MessageBlock msg={message} className="pt-6" />
          <p className="pt-10 text-sm text-gray-600">
            Files are saved immutably on IPFS, and encrypted so that only those
            who buy them can see their content.{" "}
            <a
              className="highlight"
              target="_blank"
              rel="noreferrer"
              href="/#encryption"
            >
              Learn more in our FAQs.
            </a>
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
      )}
    </div>
  )
}

export default FilesList
