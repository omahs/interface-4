import Image from "next/image"
import defaultImageUrl from "public/slicer_default.png"

type Props = {
  name: string
  imageUrl: string
}

const SlicerImage = ({ name, imageUrl }: Props) => {
  return !imageUrl || imageUrl === "https://slice.so/slicer_default.png" ? (
    <Image
      src={defaultImageUrl}
      layout="fill"
      objectFit="cover"
      alt={`${name} image`}
      placeholder="blur"
    />
  ) : (
    <Image
      src={imageUrl}
      layout="fill"
      objectFit="cover"
      alt={`${name} image`}
      blurDataURL={`${imageUrl}_blur`}
      placeholder="blur"
    />
  )
}

export default SlicerImage
