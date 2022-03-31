const getEthFromWei = (weiAmount: string, noString = true) => {
  const ethAmount = weiAmount
    ? Math.floor((Number(weiAmount) / Math.pow(10, 18)) * 10000) / 10000
    : null

  if (noString) {
    return weiAmount ? (ethAmount != 0 ? ethAmount : null) : null
  } else {
    return weiAmount ? (ethAmount != 0 ? ethAmount : "~0") : null
  }
}

export default getEthFromWei
