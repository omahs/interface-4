const functions = {
  "0x96238af8": "onProductPurchase",
  "0xd066474a": "isPurchaseAllowed"
}

const getFunctionFromSelector = (selector: string) => {
  return functions[selector] || selector
}

export default getFunctionFromSelector
