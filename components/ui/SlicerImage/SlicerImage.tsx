import Image from "next/image"
import ImageLegacy from "next/legacy/image"
import slicerDefault from "public/slicer_default.png"
import productDefault from "public/product_default.png"
import getBlurImageUrl from "@utils/getBlurImageUrl"
import Edit from "@components/icons/Edit"

type Props = {
  name: string
  imageUrl?: string
  product?: boolean
  disableHover?: boolean
  isEditable?: boolean
}

const SlicerImage = ({
  name,
  imageUrl,
  product,
  disableHover,
  isEditable
}: Props) => {
  const imageClassName =
    "transform transition-transform duration-1000 ease-out group-hover:scale-[1.075]"

  return (
    <>
      {!imageUrl || imageUrl === "https://slice.so/slicer_default.png" ? (
        product ? (
          <Image
            src={productDefault}
            alt={`${name} product image`}
            placeholder="blur"
            fill
            className={`${disableHover ? "" : imageClassName} object-cover`}
          />
        ) : (
          <Image
            src={slicerDefault}
            alt={`${name} image`}
            placeholder="blur"
            fill
            className={`${disableHover ? "" : imageClassName} object-cover`}
          />
        )
      ) : (
        // <Image
        //   src={imageUrl}
        //   alt={`${name}${product ? " product" : ""} image`}
        //   // TODO: Fix here and use blurDataURL
        //   blurDataURL={getBlurImageUrl(imageUrl)}
        //   placeholder="blur"
        //   fill
        //   className={`${disableHover ? "" : imageClassName} object-cover`}
        // />
        <ImageLegacy
          src={imageUrl}
          alt={`${name}${product ? " product" : ""} image`}
          blurDataURL={getBlurImageUrl(imageUrl)}
          placeholder="blur"
          layout="fill"
          objectFit="cover"
          className={`${disableHover ? "" : imageClassName}`}
        />
      )}
      {isEditable && (
        <div className="absolute inset-0 flex items-center justify-center text-yellow-400 bg-black nightwind-prevent bg-opacity-70">
          <p className="mr-2 text-xl font-bold">Edit</p>
          <Edit />
        </div>
      )}
    </>
  )
}

export default SlicerImage
