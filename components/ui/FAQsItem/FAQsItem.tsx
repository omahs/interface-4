import Chevron from "@components/icons/Chevron"
import { useState } from "react"

type Props = {
  question: string
  answer: string | JSX.Element
}

const FAQsItem = ({ question, answer }: Props) => {
  const [showAnswer, setShowAnswer] = useState(false)
  return (
    <>
      <div
        className="flex items-center pb-2 border-b-2 border-blue-600 cursor-pointer group"
        onClick={() => setShowAnswer((showAnswer) => !showAnswer)}
      >
        <Chevron
          className={`w-6 h-6 mb-2 mr-2 transition-transform duration-200 ease-out ${
            showAnswer ? "-rotate-90" : "group-hover:-rotate-90 -rotate-180"
          } `}
        />
        <h3 className="!mt-0 !mb-0">{question}</h3>
      </div>
      {showAnswer && (
        <div>
          {typeof answer == "string" ? <p className="">{answer}</p> : answer}
        </div>
      )}
    </>
  )
}

export default FAQsItem
