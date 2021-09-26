import { Dispatch, SetStateAction } from "react"
import { MarkdownBlock, Textarea } from ".."

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
  return editMode ? (
    <div className="pt-4">
      <Textarea
        label="Description"
        placeholder="What is this slicer about?"
        value={newDescription}
        onChange={setNewDescription}
        disabled={loading}
      />
    </div>
  ) : (
    <MarkdownBlock content={description} deps={[editMode]} />
  )
}

export default SlicerDescription
