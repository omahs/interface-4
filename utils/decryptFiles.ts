import { generateKey } from "./crypto"

const decryptFiles = async (password: string, files: File[]) => {
  const decryptedFiles: File[] = []
  const salt = Buffer.from("ddd")
  const iv = new Uint8Array([1, 0, 1])

  const key = await generateKey(password, salt)

  for (let i = 0; i < files.length; i++) {
    const buf = await files[i].arrayBuffer()
    const decryptedBuf: ArrayBuffer = await window.crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: iv,
      },
      key,
      buf
    )
    const decryptedFile = new File([decryptedBuf], "", { type: files[i].type })
    decryptedFiles.push(decryptedFile)
  }

  return decryptedFiles
}

export default decryptFiles
