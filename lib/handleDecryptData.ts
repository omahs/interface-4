const handleDecryptData = async (
  slicerId: number,
  name: string,
  creator: string,
  uid: string,
  cid: string
) => {
  const fetcher = (await import("@utils/fetcher")).default
  const web3Storage = (await import("./web3Storage")).default
  const { decryptFiles, decryptTexts, importKey } = await import(
    "@utils/crypto"
  )

  try {
    const { webStorageKey } = await fetcher("/api/webStorage")
    const res = await web3Storage(webStorageKey).get(cid)
    const files = await res.files()

    const keygenBody = {
      method: "POST",
      body: JSON.stringify({
        slicerId,
        name,
        creator,
        uid,
      }),
    }

    const thanks = files.pop()
    const notes = files.pop()
    const instructions = files.pop()

    const { exportedKey, iv } = await fetcher("/api/keygen", keygenBody)
    const key = await importKey(exportedKey)
    const decryptedFiles =
      files.length != 0
        ? await decryptFiles(key, new Uint8Array(iv), files)
        : []

    const decryptedTexts = await decryptTexts(key, new Uint8Array(iv), [
      thanks,
      notes,
      instructions,
    ])

    return { decryptedFiles, decryptedTexts }
  } catch (err) {
    console.log(err)
  }
}

export default handleDecryptData
