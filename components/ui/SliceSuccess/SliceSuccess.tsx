import { Dispatch, SetStateAction } from "react"
import { Result } from "ethers/lib/utils"
import Button from "../Button"

type Props = {
  eventLog: Result
  setSuccess: Dispatch<SetStateAction<boolean>>
}

const SliceSuccess = ({ eventLog, setSuccess }: Props) => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  const slicerAddress = eventLog && eventLog[0]
  const slicerId = Number(eventLog?.tokenId)
  return (
    <>
      <h2 className="py-4">Slicer created! 🍰</h2>
      <div className="py-6 space-y-4">
        <p>Your Slicer address is: {slicerAddress}</p>
        <p>If you hold the minimum slices, you can now customize it</p>
        <div className="pt-4 pb-10">
          <Button label="Go to Slicer" href={`${baseUrl}/slicer/${slicerId}`} />
        </div>
        <a className="highlight" onClick={() => setSuccess(false)}>
          Create a new Slicer
        </a>
      </div>
    </>
  )
}

export default SliceSuccess
