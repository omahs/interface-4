import Image from "next/image"
import Camera from "@components/icons/Camera"
import defaultImageUrl from "public/og_image_default.jpg"

type Props = {
  name: string
  imageUrl: string
  editMode: boolean
  size?: string
  border?: string
}

const SlicerImage = ({ name, imageUrl, editMode, size, border }: Props) => {
  const submitImage = async () => {}

  return (
    <div className="flex justify-center nightwind-prevent-block">
      <div
        className={`shadow-2xl overflow-hidden ${size || "max-w-sm"} ${
          border || "bg-black rounded-2xl"
        }`}
      >
        <div
          className={`relative flex items-center justify-center group ${
            editMode && "cursor-pointer"
          }`}
          onClick={() => {
            submitImage()
          }}
        >
          <div
            className={`transition-opacity duration-500 ${
              editMode && "opacity-20"
            }`}
          >
            {imageUrl ? (
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
            className={`transition-opacity duration-500 absolute w-20 h-20 ${
              editMode ? "opacity-100" : "opacity-0"
            } text-gray-200 group-hover:text-sky-300`}
          />
        </div>
      </div>
    </div>
  )
}

export default SlicerImage
