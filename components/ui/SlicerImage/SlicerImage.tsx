import Image from "next/image"
import Camera from "@components/icons/Camera"
import defaultImageUrl from "public/og_image_default.jpg"
import { Dispatch, SetStateAction, useState } from "react"
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
  size?: string
  border?: string
}

const SlicerImage = ({
  name,
  imageUrl,
  tempImageUrl,
  newImage,
  setNewImage,
  editMode,
  setMsg,
  size,
  border,
}: Props) => {
  const [uploading, setUploading] = useState(false)

  const updateImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploading(true)
    try {
      const file = e.target.files[0]
      if (file) {
        if (file.size > 3000000) {
          handleMessage(
            { message: "Max size 3MB", messageStatus: "error" },
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
    setUploading(false)
  }

  return (
    <div className="flex justify-center nightwind-prevent-block">
      <div
        className={`shadow-2xl overflow-hidden ${size || "max-w-sm"} ${
          border || "bg-black rounded-2xl"
        }`}
      >
        <label htmlFor="single">
          <div
            className={`relative flex items-center justify-center group ${
              editMode && "cursor-pointer"
            }`}
          >
            <div
              className={`flex transition-opacity duration-300 ${
                editMode && "opacity-50 group-hover:opacity-20"
              }`}
            >
              {newImage.url || tempImageUrl ? (
                /* eslint-disable @next/next/no-img-element */
                <img src={newImage.url || tempImageUrl} alt={`${name} image`} />
              ) : imageUrl ? (
                /* eslint-enable @next/next/no-img-element */
                <Image
                  src={imageUrl}
                  width={400}
                  height={400}
                  alt={`${name} image`}
                  // blurDataURL={}
                  // placeholder="blur"
                />
              ) : (
                <Image
                  src={defaultImageUrl}
                  alt={`${name} image`}
                  placeholder="blur"
                />
              )}
            </div>
            <Camera
              className={`transition-opacity duration-300 absolute w-20 h-20 ${
                editMode ? "opacity-100" : "opacity-0"
              } text-white group-hover:text-sky-300`}
            />
          </div>
        </label>
        {editMode && (
          <input
            style={{
              visibility: "hidden",
              position: "absolute",
            }}
            type="file"
            id="single"
            accept="image/*"
            onChange={(e) => updateImage(e)}
            disabled={uploading}
          />
        )}
      </div>
    </div>
  )
}

export default SlicerImage
