import { Dispatch, SetStateAction, useEffect } from "react"
import Input from "../Input"

type Props = {
  setName: Dispatch<SetStateAction<string>>
  setDescription: Dispatch<SetStateAction<string>>
}

const SliceFormBlockMetadata = ({ setName, setDescription }: Props) => {
  return (
    <div className="">
      <Input
        type="string"
        placeholder="Give it a cool name"
        className="mt-1.5"
        onChange={setName}
      />
      <Input
        type="string"
        placeholder="Give it a cool description"
        className="mt-1.5"
        onChange={setDescription}
      />
    </div>
  )
}

export default SliceFormBlockMetadata
