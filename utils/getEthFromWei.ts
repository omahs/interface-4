const getEthFromWei = (weiAmount: string) => {
  const ethAmount = weiAmount
    ? Math.floor((Number(weiAmount) / Math.pow(10, 18)) * 10000) / 10000
    : null

  return weiAmount ? (ethAmount != 0 ? ethAmount : "~0") : null
}

export default getEthFromWei
