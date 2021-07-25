import Image from "next/image"
import defaultImageUrl from "public/slicer_default.png"

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
      blurDataURL={`${imageUrl}_blur`}
      placeholder="blur"
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
