import { Input } from "@components/ui"
import fetcher from "@utils/fetcher"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import useSWR from "swr"

type Props = {
  tags: string[]
  setTags: Dispatch<SetStateAction<string[]>>
}

const InputTags = ({ tags, setTags }: Props) => {
  return (
    <div>
      <Input label="Tags (up to 3)" />
    </div>
  )
}

export default InputTags
