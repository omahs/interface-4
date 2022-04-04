import { NewImage } from "pages/slicer/[id]"
import React, { Dispatch, SetStateAction } from "react"
import { View } from "@lib/content/modals"
import { BigNumberish, utils } from "ethers"
import useSWR from "swr"
import fetcher from "@utils/fetcher"

type Props = {
  slicerId: number
  name: string
  shortDescription: string
  description: string
  newImage: NewImage
  isMultiple: boolean
  isLimited: boolean
  units: number
  ethValue: number | string
  usdValue: number | string
  isUSD: boolean
  thankMessage: string
  instructions: string
  notes: string
  files: File[]
  setModalView: Dispatch<SetStateAction<View>>
  externalCallValue: BigNumberish
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
  setModalView,
  externalCallValue
}: Props) => {
  const { data: ethUsd } = useSWR(
    "https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT",
    fetcher
  )

  const externalCallEth = utils.formatEther(externalCallValue)
  const externalCallUsd = Number(externalCallEth) * Number(ethUsd?.price)
  const productPrice = {
    eth: ethValue
      ? "Ξ " +
        Math.floor((Number(ethValue) + Number(externalCallEth)) * 1000) / 1000
      : "free",
    usd: usdValue
      ? "$ " + Math.floor((Number(usdValue) + externalCallUsd) * 100) / 100
      : "$ 0"
  }

  return (
    <div>
      <hr className="w-20 mx-auto border-gray-300 my-14" />
      <h3 className="pb-6 font-bold">Preview</h3>
      <p className="pb-12">
        See how the product will appear to buyers before the purchase and after
        redeeming it.
      </p>
      <div className="flex flex-wrap justify-around gap-4">
        <a
          className="highlight"
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
                productPrice,
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
          Product page
        </a>
        <a
          className="highlight"
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
          Redeem purchase
        </a>
      </div>
      <hr className="w-20 mx-auto border-gray-300 my-14" />
    </div>
  )
}

export default AddProductFormPreview
