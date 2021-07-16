import { Dispatch, SetStateAction } from "react"
import { Result } from "ethers/lib/utils"
import Button from "../Button"

type Props = {
  eventLog: Result
  setSuccess: Dispatch<SetStateAction<boolean>>
}

const SliceSuccess = ({ eventLog, setSuccess }: Props) => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  const slicerAddress = eventLog?.slicerAddress
  const slicerId = Number(eventLog?.tokenId)
  return (
    <>
      <h2>Slicer created 🍰</h2>
      <div className="py-6">
        <p>Your Slicer address is: {slicerAddress}</p>
        <div className="pt-8 pb-10">
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
