import Copy from "@components/icons/Copy"
import { useState } from "react"

type Props = {
  slicerAddress: string
}

const CopyAddress = ({ slicerAddress }: Props) => {
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
      <div
        className="relative flex items-center justify-center cursor-pointer highlight"
        onClick={() => copy()}
      >
        <p className="inline-block font-bold">
          {slicerAddress.replace(
            slicerAddress.substring(5, slicerAddress.length - 3),
            "___"
          )}
        </p>
        <div className="absolute right-[-35px] inline-block pl-10">
          <Copy />
        </div>
        <div
          className={`w-40 absolute p-2 top-[40px] sm:top-[auto] sm:right-[-220px] shadow-md rounded-md overflow-hidden text-white bg-gray-800 transition-opacity duration-100 ${
            showAlert ? "opacity-100 z-0" : "opacity-0 -z-10"
          }`}
        >
          <p className="text-sm">Address copied! 🍰</p>
        </div>
      </div>
    </div>
  ) : null
}

export default CopyAddress
