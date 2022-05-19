import chartGenerator from "./chartGenerator"

type Props = {
  addresses: string[]
  shares: number[]
  minimumShares: number
  totalShares: number
}

const PieChart = ({ addresses, shares, minimumShares, totalShares }: Props) => {
  const radius = 7
  const chartPerimeter = Math.PI * 2 * radius
  const chartSlices = chartGenerator({ addresses, shares, totalShares })

  return (
    <div className="pt-2 space-y-4 flex justify-center	">
      <svg height={20} width={20} viewBox={"0 0 20 20"} className="w-4/5 h-4/5">
        {chartSlices.map((slice, index) => {
          if (!slice) {
            return null
          }

          return (
            <>
              <circle
                onMouseEnter={() => {
                  console.log(index)
                }}
                onMouseLeave={() => {
                  console.log("leave")
                }}
                key={index}
                r={radius}
                cx={10}
                cy={10}
                fill="transparent"
                stroke={slice.color}
                strokeWidth={3}
                strokeDasharray={`${
                  (slice.percentageToRender * chartPerimeter) / 100
                } ${chartPerimeter}`}
                strokeDashoffset={slice.percentageToRender === 100 ? 0 : 0.2}
                transform={`rotate(${-90 + slice.startAngle} 10 10)`}
                style={{
                  transition: "stroke-dasharray .5s ease-in-out"
                }}
              />
            </>
          )
        })}
        {/* <circle r={2} cx={10} cy={10} fill="white" /> */}
      </svg>
    </div>
  )
}

export default PieChart
