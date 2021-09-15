export const generateKey = async (password: string, salt: Buffer) => {
  let enc = new TextEncoder()

  const keyMaterial = await window.crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    "PBKDF2",
    false,
    ["deriveKey"]
  )

  const key = await window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  )

  return key
}

export const decryptFiles = async (
  password: string,
  salt: Buffer,
  iv: Uint8Array,
  files: File[]
) => {
  const decryptedFiles: File[] = []

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
    const decryptedFile = new File([decryptedBuf], String(i), {
      type: files[i].type,
    })
    decryptedFiles.push(decryptedFile)
  }

  return decryptedFiles
}

export const encryptFiles = async (
  password: string,
  salt: Buffer,
  iv: Uint8Array,
  files: File[]
) => {
  const encryptedFiles: File[] = []

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
