import { Dispatch, SetStateAction, useState } from "react"
import {
  Input,
  SlicerImageBlock,
  MessageBlock,
  InputTags,
  Textarea,
} from "@components/ui"
import { NewImage } from "pages/slicer/[id]"
import { Message } from "@utils/handleMessage"

// const tagsList = ["product", "service", "other"]

type Props = {
  slicerId: number
  name: string
  description: string
  newImage: NewImage
  loading: boolean
  setName: Dispatch<SetStateAction<string>>
  setDescription: Dispatch<SetStateAction<string>>
  // setTags: Dispatch<SetStateAction<string[]>>
  setNewImage: Dispatch<SetStateAction<NewImage>>
}

const AddProductFormGeneral = ({
  slicerId,
  name,
  description,
  newImage,
  loading,
  setName,
  setDescription,
  // setTags,
  setNewImage,
}: Props) => {
  // const { data: versionData } = useSWR(
  //   name ? `/api/slicer/${slicerId}/products?name=${name}` : null,
  //   fetcher
  // )
  // const [version, setVersion] = useState(0)
  const [msg, setMsg] = useState<Message>({
    message: "",
    messageStatus: "success",
  })

  // useEffect(() => {
  //   if (versionData) {
  //     setVersion(versionData.data + 1)
  //   }
  // }, [versionData])

  return (
    <>
      <div className="relative">
        <Input
          label="Name*"
          type="string"
          value={name}
          onChange={setName}
          required
        />
        {/* {name && version != 0 && (
          <div
            className={
              "absolute top-0 right-0 flex items-center h-full pb-0.5 mr-8 pt-7"
            }
          >
            <p className="text-sm text-blue-600">v{version}</p>
          </div>
        )} */}
      </div>
      <div>
        <Textarea
          label="Description*"
          placeholder="Describe this product for prospecting customers. What will they get for buying it?"
          value={description}
          onChange={setDescription}
          required
        />
      </div>
      {/* Todo: Add tags */}
      {/* <InputTags tags={tagsList} setTags={setTags} /> */}
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
      <p className="pt-3">
        <b>Note:</b> You cannot change the name, description and image later.
      </p>

      <MessageBlock msg={msg} />
      <div>
        <hr className="w-20 mx-auto border-gray-300 my-14" />
      </div>
    </>
  )
}

export default AddProductFormGeneral
