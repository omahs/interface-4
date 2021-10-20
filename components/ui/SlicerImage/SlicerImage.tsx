import Image from "next/image"
import slicerDefault from "public/slicer_default.png"
import productDefault from "public/product_default.png"

type Props = {
  name: string
  imageUrl?: string
  product?: boolean
}

const imageClassName =
  "transform transition-transform duration-1000 ease-out hover:scale-[1.075]"

const SlicerImage = ({ name, imageUrl, product }: Props) => {
  return !imageUrl || imageUrl === "https://slice.so/slicer_default.png" ? (
    product ? (
      <Image
        src={productDefault}
        layout="fill"
        objectFit="cover"
        alt={`${name} product image`}
        placeholder="blur"
        className={imageClassName}
      />
    ) : (
      <Image
        src={slicerDefault}
        layout="fill"
        objectFit="cover"
        alt={`${name} image`}
        placeholder="blur"
        className={imageClassName}
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
      className={imageClassName}
    />
  )
}

export default SlicerImage
