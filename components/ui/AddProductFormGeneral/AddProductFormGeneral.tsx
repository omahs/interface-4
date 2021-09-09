import { Dispatch, SetStateAction, useState } from "react"
import { Input, SlicerImageBlock, MessageBlock } from "@components/ui"
import { NewImage } from "pages/slicer/[id]"
import { Message } from "@utils/handleMessage"

type Props = {
  name: string
  description: string
  newImage: NewImage
  loading: boolean
  setName: Dispatch<SetStateAction<string>>
  setDescription: Dispatch<SetStateAction<string>>
  setNewImage: Dispatch<SetStateAction<NewImage>>
}

const AddProductFormGeneral = ({
  name,
  description,
  newImage,
  loading,
  setName,
  setDescription,
  setNewImage,
}: Props) => {
  const [msg, setMsg] = useState<Message>({
    message: "",
    messageStatus: "success",
  })

  return (
    <>
      <div>
        <Input
          label="Name"
          type="string"
          value={name}
          onChange={setName}
          required
        />
      </div>
      <div>
        <Input
          label="Description"
          type="string"
          value={description}
          onChange={setDescription}
          required
        />
      </div>
      {/* Todo: Add product image */}
      <SlicerImageBlock
        name={name}
        newImage={newImage}
        setNewImage={setNewImage}
        label="Image"
        upload={true}
        msg={msg}
        setMsg={setMsg}
        loading={loading}
        maxHeight="max-h-[250px]"
      />
      <MessageBlock msg={msg} />
      {/* Todo: Add tags */}
      <div>
        <hr className="w-20 mx-auto border-gray-300 my-14" />
      </div>
    </>
  )
}

export default AddProductFormGeneral
