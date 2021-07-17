import { Slicer } from "@prisma/client"
import Image from "next/image"
import imageUrl from "public/og_image_default.jpg"

type Props = {
  slicerInfo: Slicer
  size?: string
  border?: string
}

const SlicerImage = ({ slicerInfo, size, border }: Props) => {
  return (
    <div className="flex justify-center">
      <div
        className={`flex overflow-hidden ${size || "max-w-sm"} ${
          border || "border-8 border-gray-900 rounded-md"
        }`}
      >
        {slicerInfo?.imageUrl ? (
          <Image
            src={slicerInfo?.imageUrl}
            width={400}
            height={400}
            alt={`${slicerInfo?.name} image`}
            // blurDataURL={}
            // placeholder="blur"
          />
        ) : (
          <Image
            src={imageUrl}
            alt={`${slicerInfo?.name} image`}
            placeholder="blur"
          />
        )}
      </div>
    </div>
  )
}

export default SlicerImage
