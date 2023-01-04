export type Shortcode = {
  [k: string]: {
    label: string
    value: string | string[]
  }
}

export type ReducedShortcode = {
  [k: string]: string[]
}

export const defaultShortcodes = {
  buyerAddress: { label: "Buyer address", value: "" },
  purchasedQuantity: { label: "Purchased quantity", value: "" },
  slicerId: { label: "Slicer ID", value: "" },
  productId: { label: "Product ID", value: "" },
  sliceRedeemLink: { label: "Slice Redeem link", value: "" }
}

const useDecodeShortcode = (
  account: string,
  purchasedQuantity: string,
  slicerId: string,
  productId: string,
  instructions: string,
  accountCodes?: {
    [k: string]: string
  }
) => {
  defaultShortcodes.buyerAddress.value = account
  defaultShortcodes.purchasedQuantity.value = purchasedQuantity
  defaultShortcodes.slicerId.value = slicerId
  defaultShortcodes.productId.value = productId
  defaultShortcodes.sliceRedeemLink.value = `https://${
    process.env.NEXT_PUBLIC_CHAIN_ID === "5" ? "testnet." : ""
  }redeem.slice.so?slicer=${slicerId}&product=${productId}`

  Object.entries(defaultShortcodes).map(([key, shortcode]) => {
    instructions = instructions?.replaceAll(`{{${key}}}`, shortcode.value)
  })

  if (accountCodes && JSON.stringify(accountCodes) != "{}") {
    Object.entries(accountCodes).map(([key, val]) => {
      instructions = instructions?.replaceAll(`{{${key}}}`, val)
    })
  }

  return instructions
}

export default useDecodeShortcode
