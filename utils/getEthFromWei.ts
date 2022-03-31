const getEthFromWei = (amount: string) => {
  return amount
    ? Math.floor((Number(amount) / Math.pow(10, 18)) * 10000) / 10000
    : null
}

export default getEthFromWei
