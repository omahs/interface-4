import mime from "mime-types"
import fetcher from "@utils/fetcher"
import web3Storage from "./web3Storage"
import { decryptFiles, decryptText, importKey } from "@utils/crypto"

const handleDecryptData = async (
  slicerId: number,
  name: string,
  author: string,
  cid: string
) => {
  const { webStorageKey } = await fetcher("/api/webStorage")
  const res = await web3Storage(webStorageKey).get(cid)
  const files = await res.files()

  const keygenBody = {
    method: "POST",
    body: JSON.stringify({
      slicerId,
      name,
      author,
    }),
  }
  const { exportedKey, iv } = await fetcher("/api/keygen", keygenBody)
  const key = await importKey(exportedKey)

  for (const file of files) {
    const filename = file.name
    const fileExt = filename.split(".").pop()
    const type: string = mime.lookup(fileExt)
    const f = await decryptFiles(key, new Uint8Array(iv), [file])
    const buff = await f[0].arrayBuffer()
    const ff = new File([buff], f[0].name, { type })
    console.log(URL.createObjectURL(ff))
    if (!type) {
      console.log(await decryptText(key, new Uint8Array(iv), file))
    }
  }
}

export default handleDecryptData

// Todo: This
