import { Step } from "pages/slicer/[id]/products/new"
import { Dispatch, SetStateAction, useState } from "react"

type Props = {
  progressStepIndex: number
  steps: Step[]
  progressStep: string
  setProgressStep: Dispatch<SetStateAction<string>>
}

const AddProductProgress = ({
  steps,
  progressStepIndex,
  progressStep,
  setProgressStep
}: Props) => {
  return (
    <ul className="overflow-x-scroll py-4 flex gap-0.5 items-center text-sm font-medium">
      {steps.map(({ label }, key) => (
        <li key={key} className="flex gap-0.5 items-center">
          <p
            className={`${
              progressStep == label
                ? "text-blue-600"
                : progressStepIndex > key
                ? ""
                : "text-gray-400 hover:text-gray-700"
            } cursor-pointer px-2 py-0.5 rounded-md border-gray-200 border-2 flex-shrink-0`}
            onClick={() => setProgressStep(label)}
          >
            {label}
          </p>
          {key != steps.length - 1 && (
            <div className="w-4 h-0.5 bg-gray-300 flex-shrink-0" />
          )}
        </li>
      ))}
    </ul>
  )
}

export default AddProductProgress
