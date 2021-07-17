import Copy from "@components/icons/Copy"

type Props = {
  slicerAddress: string
}

const CopyAddress = ({ slicerAddress }: Props) => {
  return slicerAddress ? (
    <div className="inline-block">
      <div className="relative flex items-center justify-center cursor-pointer highlight">
        <p className="inline-block font-bold">
          {slicerAddress.replace(
            slicerAddress.substring(5, slicerAddress.length - 3),
            "___"
          )}
        </p>
        <div className="absolute right-[-35px] inline-block">
          <Copy />
        </div>
      </div>
    </div>
  ) : null
}

export default CopyAddress
