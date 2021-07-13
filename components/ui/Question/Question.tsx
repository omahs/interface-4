import { useState } from "react"
import QuestionMark from "@components/icons/QuestionMark"

type Props = {
  text: string | object
}

export default function Question({ text }: Props) {
  const [show, setShow] = useState(false)

  return (
    <div
      // className="relative"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <div
        className={`${
          !show && "hidden"
        } absolute p-5 w-80 bg-gray-50 shadow-xl bottom-0 left-0 mb-9 rounded-md overflow-hidden`}
      >
        <p>{text}</p>
      </div>
      <div className="p-2">
        <QuestionMark />
      </div>
    </div>
  )
}
