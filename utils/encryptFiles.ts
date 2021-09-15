import { generateKey } from "./crypto"

const encryptFiles = async (password: string, files: File[]) => {
  const encryptedFiles: File[] = []
  const salt = Buffer.from("ddd")
  const iv = new Uint8Array([1, 0, 1])

  const key = await generateKey(password, salt)

  for (let i = 0; i < files.length; i++) {
    const buf = await files[i].arrayBuffer()
    const encryptedBuf: ArrayBuffer = await window.crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv: iv,
      },
      key,
      buf
    )
    const encryptedFile = new File([encryptedBuf], String(i), {
      type: files[i].type,
    })
    encryptedFiles.push(encryptedFile)
  }

  return encryptedFiles
}

export default encryptFiles

// Todo: Make it so that password salt and iv are safe (can be exposed?)
// Todo: Figure out pass values
// Todo: Use a cypherKey onlyOwner saved on slicer as salt?
