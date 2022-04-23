const functions = {
  "0xa23fffb9": "onProductPurchase",
  "0x95db9368": "isPurchaseAllowed"
}

const getFunctionFromSelector = (selector: string) => {
  return functions[selector] || selector
}

export default getFunctionFromSelector
