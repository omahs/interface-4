import { Dispatch, SetStateAction, useState } from "react"
import Input from "../Input"

type Props = {
  description: string
  newDescription: string
  setNewDescription: Dispatch<SetStateAction<string>>
  editMode: boolean
  loading: boolean
}

const SlicerDescription = ({
  description,
  newDescription,
  setNewDescription,
  editMode,
  loading,
}: Props) => {
  const [input, setInput] = useState("")
  const [tags, setTags] = useState([])

  const onKeyDown = (e) => {
    const { key } = e
    const trimmedInput = input.trim()

    if (key === "," && trimmedInput.length && !tags.includes(trimmedInput)) {
      e.preventDefault()
      setTags((prevState) => [...prevState, trimmedInput])
      setInput("")
    }
  }

  return editMode ? (
    <div className="container">
      {tags.map((tag, key) => (
        <div key={key}>
          <p>{tag}</p>
        </div>
      ))}
      <Input
        value={input}
        placeholder="Enter a tag"
        onKeyDown={onKeyDown}
        onChange={setInput}
      />
    </div>
  ) : (
    <p className="text-lg font-semibold sm:text-xl">{description}</p>
  )
}

export default SlicerDescription

// Todo: Add Slicer tags
