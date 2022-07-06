import { Dispatch, SetStateAction } from "react"
import timeout from "./timeout"

const copyText = async (
  text: string,
  setIsCopied: Dispatch<SetStateAction<boolean>>
) => {
  await navigator.clipboard.writeText(text)
  setIsCopied(true)
  await timeout(1500)
  setIsCopied(false)
}

export default copyText
