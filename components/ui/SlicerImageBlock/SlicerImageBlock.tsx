import Camera from "@components/icons/Camera"
import { SlicerImage } from "@components/ui"
import { Dispatch, SetStateAction } from "react"
import { NewImage } from "pages/slicer/[id]"
import handleMessage, { Message } from "@utils/handleMessage"

type Props = {
  name: string
  upload: boolean
  loading: boolean
  msg: Message
  newImage: NewImage
  setNewImage: Dispatch<SetStateAction<NewImage>>
  setMsg: Dispatch<SetStateAction<Message>>
  imageUrl?: string
  tempImageUrl?: string
  label?: string
  border?: string
  maxHeight?: string
  product?: boolean
}

const SlicerImageBlock = ({
  name,
  tempImageUrl,
  newImage,
  setNewImage,
  upload,
  msg,
  setMsg,
  loading,
  imageUrl,
  label,
  border,
  maxHeight,
  product,
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
    <div>
      {label && (
        <p className="pb-3 text-sm font-semibold text-left text-gray-700">
          {label}
        </p>
      )}
      <div className="nightwind-prevent-block">
        <div
          className={`overflow-hidden ${border || "rounded-2xl"} ${
            msg.messageStatus === "error" ? "shadow-error-strong" : ""
          }`}
        >
          <label
            htmlFor="single"
            className={`relative flex items-center justify-center group ${
              upload && !loading ? "bg-gray-800 cursor-pointer" : ""
            }`}
          >
            <div
              className={`transition-opacity flex flex-grow duration-300 ${
                upload && !loading ? "opacity-50 group-hover:opacity-20" : ""
              }`}
            >
              <div
                className={`relative w-full ${
                  maxHeight ? maxHeight : "max-h-[420px]"
                } img-background`}
                id="imageWrapper"
              >
                {newImage.url || tempImageUrl ? (
                  /* eslint-disable @next/next/no-img-element */
                  <img
                    className="object-cover w-full h-full"
                    src={newImage.url || tempImageUrl}
                    alt={`${name} image`}
                  />
                ) : (
                  /* eslint-enable @next/next/no-img-element */
                  <SlicerImage
                    name={name}
                    imageUrl={imageUrl}
                    product={product}
                  />
                )}
              </div>
            </div>
            <Camera
              className={`transition-opacity duration-300 absolute w-16 h-16 sm:w-20 sm:h-20 ${
                upload && !loading ? "opacity-100" : "opacity-0"
              } text-white group-hover:text-sky-300`}
            />
          </label>
          {upload && (
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
    </div>
  )
}

export default SlicerImageBlock
