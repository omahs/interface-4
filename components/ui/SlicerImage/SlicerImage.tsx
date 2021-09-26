import Image from "next/image"
import slicerDefault from "public/slicer_default.png"

type Props = {
  name: string
  imageUrl?: string
  product?: boolean
}

const SlicerImage = ({ name, imageUrl, product }: Props) => {
  return !imageUrl || imageUrl === "https://slice.so/slicer_default.png" ? (
    product ? (
      <Image
        src={slicerDefault}
        layout="fill"
        objectFit="cover"
        alt={`${name} product image`}
        placeholder="blur"
      />
    ) : (
      <Image
        src={slicerDefault}
        layout="fill"
        objectFit="cover"
        alt={`${name} image`}
        placeholder="blur"
      />
    )
  ) : (
    <Image
      src={imageUrl}
      layout="fill"
      objectFit="cover"
      alt={`${name}${product ? " product" : ""} image`}
      blurDataURL={`${imageUrl}_blur`}
      placeholder="blur"
    />
  )
}

export default SlicerImage
