import Image from "next/image"
import Camera from "@components/icons/Camera"
import defaultImageUrl from "public/og_image_default.jpg"
import { Dispatch, SetStateAction, useState } from "react"
import { NewImage } from "pages/slicer/[id]"

type Props = {
  name: string
  imageUrl: string
  newImage: NewImage
  setNewImage: Dispatch<SetStateAction<NewImage>>
  editMode: boolean
  size?: string
  border?: string
}

const SlicerImage = ({
  name,
  imageUrl,
  newImage,
  setNewImage,
  editMode,
  size,
  border,
}: Props) => {
  const [uploading, setUploading] = useState(false)

  const updateImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploading(true)
    const file = e.target.files[0]
    setNewImage({ url: URL.createObjectURL(file), file })
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
              {newImage.url ? (
                /* eslint-disable @next/next/no-img-element */
                <img src={newImage.url} alt={`${name} image`} />
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
