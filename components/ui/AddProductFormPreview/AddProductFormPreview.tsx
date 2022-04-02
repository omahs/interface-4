import { NewImage } from "pages/slicer/[id]"
import React, { Dispatch, SetStateAction } from "react"
import { View } from "@lib/content/modals"

type Props = {
  slicerId: number
  name: string
  shortDescription: string
  description: string
  newImage: NewImage
  isMultiple: boolean
  isLimited: boolean
  units: number
  ethValue: number
  usdValue: number
  isUSD: boolean
  thankMessage: string
  instructions: string
  notes: string
  files: File[]
  setModalView: Dispatch<SetStateAction<View>>
}

const AddProductFormPreview = ({
  slicerId,
  name,
  shortDescription,
  description,
  newImage,
  isMultiple,
  isLimited,
  units,
  ethValue,
  usdValue,
  isUSD,
  thankMessage,
  instructions,
  notes,
  files,
  setModalView
}: Props) => {
  return (
    <div>
      <hr className="w-20 mx-auto border-gray-300 my-14" />
      <h3 className="pb-12 font-bold">Preview pages</h3>
      <div className="flex flex-wrap justify-around gap-4">
        <a
          className="underline"
          onClick={() =>
            setModalView({
              name: "PRODUCT_VIEW",
              cross: true,
              params: {
                preview: true,
                slicerId,
                productId: 0,
                name: name || "A nice product",
                shortDescription,
                description,
                image: newImage.url,
                texts: {
                  thanks: thankMessage,
                  instructions: instructions
                },
                productPrice: {
                  eth: `Ξ ${
                    ethValue ? Math.floor(ethValue * 1000) / 1000 : "..."
                  }`,
                  usd: `$ ${
                    usdValue ? Math.floor(usdValue * 100) / 100 : "..."
                  }`
                },
                isUSD,
                isInfinite: !isLimited,
                isMultiple,
                availableUnits: units,
                totalPurchases: 69000,
                purchaseInfo: {
                  files: files.length != 0,
                  instructions: instructions.length != 0,
                  notes: notes.length != 0
                },
                slicerAddress: "preview",
                purchasedQuantity: 0,
                availabilityColor:
                  units < 10
                    ? units == 0
                      ? "text-red-500"
                      : "text-yellow-600"
                    : "text-green-600"
              }
            })
          }
        >
          Product
        </a>
        <a
          className="underline"
          onClick={() =>
            setModalView({
              name: "REDEEM_PRODUCT_VIEW",
              cross: true,
              params: {
                slicerId,
                productId: 0,
                name: name || "A nice product",
                image: newImage.url,
                purchasedQuantity: Number(1),
                texts: {
                  thanks: thankMessage,
                  instructions: instructions
                },
                decryptedFiles: files,
                decryptedTexts: { notes }
              }
            })
          }
        >
          Purchase
        </a>
      </div>
      <hr className="w-20 mx-auto border-gray-300 my-14" />
    </div>
  )
}

export default AddProductFormPreview
