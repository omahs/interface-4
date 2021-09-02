import Camera from "@components/icons/Camera"
import { SlicerImage } from "@components/ui"
import { Dispatch, SetStateAction } from "react"
import { NewImage } from "pages/slicer/[id]"
import handleMessage, { Message } from "@utils/handleMessage"

type Props = {
  name: string
  imageUrl: string
  tempImageUrl: string
  newImage: NewImage
  setNewImage: Dispatch<SetStateAction<NewImage>>
  editMode: boolean
  setMsg: Dispatch<SetStateAction<Message>>
  loading: boolean
  border?: string
}

const SlicerImageBlock = ({
  name,
  imageUrl,
  tempImageUrl,
  newImage,
  setNewImage,
  editMode,
  setMsg,
  loading,
  border,
}: Props) => {
  const updateImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files[0]
      if (file) {
        if (file.size > 15000000) {
          handleMessage(
            { message: "Max size 15MB", messageStatus: "error" },
            setMsg
          )
        } else {
          const url = URL.createObjectURL(file)
          setNewImage({ url, file })
        }
      }
    } catch (err) {
      null
    }
  }

  return (
    <div className="py-6 nightwind-prevent-block">
      <div className={`overflow-hidden ${border || "rounded-2xl"}`}>
        <label
          htmlFor="single"
          className={`relative flex items-center justify-center group ${
            editMode && !loading ? "bg-gray-800 cursor-pointer" : ""
          }`}
        >
          <div
            className={`transition-opacity flex flex-grow duration-300 ${
              editMode && !loading ? "opacity-50 group-hover:opacity-20" : ""
            }`}
          >
            <div
              className="w-full max-h-[420px] img-background"
              id="imageWrapper"
            >
              {/* Todo: Fix div size */}
              {newImage.url || tempImageUrl ? (
                /* eslint-disable @next/next/no-img-element */
                <img
                  className="object-cover w-full h-full"
                  src={newImage.url || tempImageUrl}
                  alt={`${name} image`}
                />
              ) : (
                /* eslint-enable @next/next/no-img-element */
                <SlicerImage name={name} imageUrl={imageUrl} />
              )}
            </div>
          </div>
          <Camera
            className={`transition-opacity duration-300 absolute w-16 h-16 sm:w-20 sm:h-20 ${
              editMode && !loading ? "opacity-100" : "opacity-0"
            } text-white group-hover:text-sky-300`}
          />
        </label>
        {editMode && (
          <input
            className="absolute hidden"
            type="file"
            id="single"
            accept="image/*"
            onChange={(e) => updateImage(e)}
            disabled={loading}
          />
        )}
      </div>
    </div>
  )
}

export default SlicerImageBlock
