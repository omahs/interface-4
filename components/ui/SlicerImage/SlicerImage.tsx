import Image from "next/image"
import slicerDefault from "public/slicer_default.png"
import productDefault from "public/product_default.png"
import getBlurImageUrl from "@utils/getBlurImageUrl"

type Props = {
  name: string
  imageUrl?: string
  product?: boolean
  disableHover?: boolean
}

const imageClassName =
  "transform transition-transform duration-1000 ease-out group-hover:scale-[1.075]"

const SlicerImage = ({ name, imageUrl, product, disableHover }: Props) => {
  return !imageUrl || imageUrl === "https://slice.so/slicer_default.png" ? (
    product ? (
      <Image
        src={productDefault}
        layout="fill"
        objectFit="cover"
        alt={`${name} product image`}
        placeholder="blur"
        className={disableHover ? "" : imageClassName}
      />
    ) : (
      <Image
        src={slicerDefault}
        layout="fill"
        objectFit="cover"
        alt={`${name} image`}
        placeholder="blur"
        className={disableHover ? "" : imageClassName}
      />
    )
  ) : (
    <Image
      src={imageUrl}
      layout="fill"
      objectFit="cover"
      alt={`${name}${product ? " product" : ""} image`}
      blurDataURL={getBlurImageUrl(imageUrl)}
      placeholder="blur"
      className={disableHover ? "" : imageClassName}
    />
  )
}

export default SlicerImage
