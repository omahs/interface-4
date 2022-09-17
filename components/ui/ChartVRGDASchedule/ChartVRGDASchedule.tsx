import formatNumber from "@utils/formatNumber"

type Props = {
  rate: "Linear" | "Logistic"
  units: number
  timeFactor: number
}

const ChartVRGDASchedule = ({ rate, units, timeFactor }: Props) => {
  const isDataFilled = units != 0 && timeFactor != 0

  return (
    <>
      <h3 className="pt-8">Sale schedule</h3>
      <div className="py-4">
        <div className="relative h-64 pl-2 text-gray-400 xs:pl-6">
          <div className="relative h-full overflow-hidden text-gray-400 border-b border-l border-gray-300">
            {rate == "Linear" ? (
              <svg
                viewBox="0 0 944 512"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                className="absolute bottom-0 w-full h-full pt-6 pr-4"
              >
                <line
                  x1="943"
                  y1="56"
                  x2="943"
                  y2="512"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-dasharray="6 6"
                />
                <line
                  x1="942"
                  y1="57"
                  x2="3"
                  y2="57"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-dasharray="6 6"
                />
                <path
                  d="M-0.336914 511.63L944 57"
                  stroke="#2563EB"
                  stroke-width="3"
                />
              </svg>
            ) : (
              <svg
                viewBox="0 0 944 512"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                className="absolute bottom-0 w-full h-full pt-6"
              >
                <line
                  x1="66"
                  y1="302"
                  x2="66"
                  y2="512"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-dasharray="6 6"
                />
                <line
                  x1="939"
                  y1="57"
                  y2="57"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-dasharray="6 6"
                />
                <path
                  d="M1.10836 512.608C82.9914 204.501 124.054 166.696 210.5 114.5C296.946 62.3038 435.5 57.5 944 57.5"
                  stroke="#2563EB"
                  stroke-width="3"
                />
              </svg>
            )}
          </div>
          <div className="absolute bottom-0 left-0 w-full -ml-12 -mr-12 border-b border-gray-300" />
          <div className="absolute bottom-0 h-full -mb-8 border-l border-gray-300" />
          <p className="absolute top-0 left-0 ml-5 text-sm xs:mt-1 xs:-ml-6">
            Sales
          </p>
          <p
            className={`absolute top-0 left-0 mt-7 text-sm text-black min-w-[40px] ml-6 text-left xs:text-right xs:-ml-7 xs:mt-10`}
          >
            {formatNumber(units)}
          </p>
          {rate == "Linear" ? (
            <>
              <p
                className={`absolute bottom-0 right-0 mr-2 text-sm ${
                  isDataFilled ? "text-black" : ""
                } -mb-7`}
              >
                {isDataFilled
                  ? `${formatNumber(
                      Math.floor((units / timeFactor) * 100) / 100
                    )} days`
                  : "Sellout time"}
              </p>
            </>
          ) : (
            <>
              <p className="absolute bottom-0 right-0 mr-2 text-sm -mb-7">
                Time
              </p>
              {isDataFilled && (
                <p className="absolute bottom-0 left-0 w-32 -ml-4 text-sm text-center text-black xs:ml-1 -mb-7">
                  {formatNumber(timeFactor)} days
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default ChartVRGDASchedule
