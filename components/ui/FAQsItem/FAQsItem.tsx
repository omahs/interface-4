import Chevron from "@components/icons/Chevron"
import { useState } from "react"

type Props = {
  question: string
  answer: string | JSX.Element
  id: string
}

const FAQsItem = ({ question, answer, id }: Props) => {
  const [showAnswer, setShowAnswer] = useState(false)
  return (
    <>
      <div
        className="flex items-center pt-8 pb-1 border-b-2 border-blue-600 cursor-pointer group"
        onClick={() => setShowAnswer((showAnswer) => !showAnswer)}
        id={id}
      >
        <div className="flex-shrink-0 w-6 h-6 mb-2 mr-2">
          <Chevron
            className={`transition-transform duration-200 ease-out ${
              showAnswer
                ? "-rotate-90"
                : "group-hover:translate-x-[6px] -rotate-180"
            } `}
          />
        </div>
        <h3 className="!mt-0 !mb-0">{question}</h3>
      </div>
      {showAnswer && (
        <div className="pt-2 xs:ml-8">
          {typeof answer == "string" ? <p className="">{answer}</p> : answer}
        </div>
      )}
    </>
  )
}

export default FAQsItem
