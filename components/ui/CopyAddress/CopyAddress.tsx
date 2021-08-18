import Copy from "@components/icons/Copy"
import { useState } from "react"

type Props = {
  slicerAddress: string
  showIcon?: boolean
  position?: string
}

const CopyAddress = ({ slicerAddress, showIcon = true, position }: Props) => {
  const [showAlert, setShowAlert] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(slicerAddress)
    setShowAlert(true)
    setTimeout(() => {
      setShowAlert(false)
    }, 1500)
  }

  return slicerAddress ? (
    <div className="inline-block">
      <div className="relative flex items-center justify-center w-full pl-2.5">
        <div
          className="flex items-center justify-center cursor-pointer highlight"
          onClick={() => copy()}
        >
          <p className="inline-block text-sm font-medium">
            {slicerAddress.replace(
              slicerAddress.substring(5, slicerAddress.length - 3),
              `\xa0\xa0\xa0\xa0\xa0\xa0`
            )}
          </p>
          {showIcon && (
            <div className="inline-block pl-2">
              <Copy className="w-5 h-5" />
            </div>
          )}
        </div>
        <div
          className={`w-40 absolute p-2 ${
            position ? position : "top-[40px] sm:top-[auto] sm:right-[-180px]"
          } shadow-md rounded-md overflow-hidden flex justify-center items-center text-white bg-gray-800 transition-opacity duration-100 ${
            showAlert ? "opacity-100 z-20" : "opacity-0 -z-10"
          }`}
        >
          <p className="text-sm">Address copied! 🍰</p>
        </div>
      </div>
    </div>
  ) : null
}

export default CopyAddress
