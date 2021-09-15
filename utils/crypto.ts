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

export const encryptFiles = async (
  password: string,
  salt: Buffer,
  iv: Uint8Array,
  files: File[],
  thankMessage: string,
  instructions: string,
  notes: string
) => {
  const encryptedFiles: File[] = []

  const key = await generateKey(password, salt)

  for (let i = 0; i < files.length; i++) {
    const fileExt = files[i].name.split(".").pop()
    const buf = await files[i].arrayBuffer()
    const encryptedBuf: ArrayBuffer = await window.crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv: iv,
      },
      key,
      buf
    )
    const encryptedFile = new File([encryptedBuf], `${i + 1}.${fileExt}`, {
      type: files[i].type,
    })
    encryptedFiles.push(encryptedFile)
  }

  const encryptedThankMessage = await encryptText(
    key,
    iv,
    thankMessage,
    "Thanks"
  )
  const encryptedInstructions = await encryptText(
    key,
    iv,
    instructions,
    "Instructions"
  )
  const encryptedNotes = await encryptText(key, iv, notes, "Notes")

  encryptedFiles.push(
    encryptedThankMessage,
    encryptedInstructions,
    encryptedNotes
  )

  return encryptedFiles
}

export const decryptFiles = async (
  key: CryptoKey,
  iv: Uint8Array,
  files: File[]
) => {
  const decryptedFiles: File[] = []

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
    console.log(decryptedBuf)
    const decryptedFile = new File([decryptedBuf], files[i].name, {
      type: files[i].type,
    })
    decryptedFiles.push(decryptedFile)
  }

  return decryptedFiles
}

const encryptText = async (
  key: CryptoKey,
  iv: Uint8Array,
  text: string,
  filename: string
) => {
  const enc = new TextEncoder()
  const encoded = enc.encode(text)

  const encryptedBuf: ArrayBuffer = await window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    key,
    encoded
  )

  const encryptedFile = new File([encryptedBuf], filename, {
    type: "text/plain",
  })

  return encryptedFile
}

export const decryptText = async (
  key: CryptoKey,
  iv: Uint8Array,
  encoded: File
) => {
  const dec = new TextDecoder()
  const buf = await encoded.arrayBuffer()

  const decryptedBuf: ArrayBuffer = await window.crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    key,
    buf
  )
  const decryptedText = dec.decode(decryptedBuf)

  return decryptedText
}
