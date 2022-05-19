import { colorList, darkColorList } from "@utils/colorList"

type Props = {
  addresses: string[]
  shares: number[]
  totalShares: number
}
type ChartSlice = {
  startAngle: number
  color: string
  percentageToRender: number
  address: string
}

export default function chartGenerator({
  addresses,
  shares,
  totalShares
}: Props): ChartSlice[] {
  let currentPercentage = 0 // percentage of the chart that has been filled
  let numberOfAddressesWithResidualPercentage = 0 // number of addresses that owns less than 1% of the total shares
  const chartSlices = shares.map((share, index) => {
    // ignore empty values around the form
    if (share === 0) {
      return null
    }

    const percentageToRender = Number(((share / totalShares) * 100).toFixed(2))
    const color = colorList[index % colorList.length][0]

    // define start angle
    const startAngle = (currentPercentage / 100) * 360

    // if percentageToRender is less than 1, we need to render the rest of the pie
    if (percentageToRender < 1) {
      numberOfAddressesWithResidualPercentage++
      return {
        startAngle,
        color,
        percentageToRender: 0,
        address: addresses[index]
      }
    }
    currentPercentage += percentageToRender

    return {
      startAngle,
      color,
      percentageToRender,
      address: addresses[index]
    }
  })

  // render the residual's slice or fill the rest of the pie
  if (numberOfAddressesWithResidualPercentage === 1) {
    chartSlices.find(
      (slice) => slice?.percentageToRender === 0
    ).percentageToRender = 100 - currentPercentage
  } else if (numberOfAddressesWithResidualPercentage > 1) {
    chartSlices.push({
      startAngle: (currentPercentage / 100) * 360,
      color: darkColorList[0][0],
      percentageToRender: 100 - currentPercentage,
      address: `${numberOfAddressesWithResidualPercentage} addresses with < 1%`
    })
  } else if (
    !numberOfAddressesWithResidualPercentage &&
    currentPercentage < 100 &&
    chartSlices[chartSlices.length - 1]
  ) {
    chartSlices[chartSlices.length - 1].percentageToRender +=
      100 - currentPercentage
  }

  return chartSlices
}
