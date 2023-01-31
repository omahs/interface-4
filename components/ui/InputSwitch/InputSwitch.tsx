import { Dispatch, SetStateAction } from "react"
import Question from "../Question"
import MySwitch from "../MySwitch"

type Props = {
  label: string
  enabled: boolean
  setEnabled: Dispatch<SetStateAction<boolean>>
  questionText?: string | JSX.Element
  position?: string
  disabled?: boolean
}

export default function InputSwitch({
  label,
  enabled,
  setEnabled,
  questionText,
  position = "bottom-[10px] right-0",
  disabled
}: Props) {
  return (
    <div className="relative flex items-center justify-end py-2 ">
      <div className="flex items-center mr-3">
        <p className="pr-1">{label}</p>
        {questionText && <Question text={questionText} position={position} />}
      </div>
      <MySwitch enabled={enabled} setEnabled={setEnabled} disabled={disabled} />
    </div>
  )
}
