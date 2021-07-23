import Image from "next/image"
import defaultImageUrl from "public/og_image_default.jpg"

type Props = {
  name: string
  imageUrl: string
}

const SlicerImage = ({ name, imageUrl }: Props) => {
  return imageUrl ? (
    <Image
      src={imageUrl}
      layout="fill"
      objectFit="cover"
      alt={`${name} image`}
      // blurDataURL={}
      // placeholder="blur"
    />
  ) : (
    <Image
      src={defaultImageUrl}
      layout="fill"
      objectFit="cover"
      alt={`${name} image`}
      placeholder="blur"
    />
  )
}

export default SlicerImage
