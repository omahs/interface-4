import { Dispatch, SetStateAction } from "react"
import { Result } from "ethers/lib/utils"
import Button from "../Button"
import DoubleText from "../DoubleText"

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
      <DoubleText
        inactive
        logoText={`Slicer created! 🍰`}
        size="text-4xl sm:text-5xl"
        position="pb-4 sm:pb-6"
      />
      <div className="max-w-lg py-6 mx-auto space-y-4">
        <p>
          Your slicer address is <b>{slicerAddress}</b>
        </p>
        <p>
          If you hold the minimum slices, you can now customize it by clicking
          on the edit icon near the slicer name
        </p>
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
