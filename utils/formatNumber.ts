const SI_SYMBOL = ["", "k", "M", "B", "T", "P", "E"]

const formatNumber = (number: number, decimals = 1) => {
  const tier = (Math.log10(Math.abs(number)) / 3) | 0
  if (tier == 0) return number
  const suffix = SI_SYMBOL[tier]
  const scale = Math.pow(10, tier * 3)
  const scaled = number / scale

  const roundFactor = Math.pow(10, decimals)
  const formatted = Math.floor(scaled * roundFactor) / roundFactor
  return String(formatted) + suffix
}

export const formatNumberWithUnit = (formattedNumber: string) => {
  const numberWithUnit = formattedNumber.split(" ")[1]
  const units = SI_SYMBOL.slice(1)

  const unit = units.findIndex(
    (unit) => unit == numberWithUnit.charAt(numberWithUnit.length - 1)
  )
  if (unit == -1) return numberWithUnit
  return Number(numberWithUnit.slice(0, -1)) * ((unit + 1) * 10 ** 3)
}

export default formatNumber
