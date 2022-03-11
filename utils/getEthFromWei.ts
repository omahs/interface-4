const getEthFromWei = (amount: { type: string; hex: string }) => {
  return amount
    ? Math.floor((Number(amount.hex) / Math.pow(10, 18)) * 10000) / 10000
    : null
}

export default getEthFromWei
