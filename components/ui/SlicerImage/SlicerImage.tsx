import Image from "next/image"
import defaultImageUrl from "public/og_image_default.jpg"

type Props = {
  name: string
  imageUrl: string
  size?: string
  border?: string
}

const SlicerImage = ({ name, imageUrl, size, border }: Props) => {
  return (
    <div className="flex justify-center">
      <div
        className={`flex overflow-hidden ${size || "max-w-sm"} ${
          border || "border-8 border-gray-900 rounded-md"
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
    </div>
  )
}

export default SlicerImage
