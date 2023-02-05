import { Step } from "pages/slicer/[id]/products/new"
import { Dispatch, SetStateAction, useState } from "react"

type Props = {
  progressStepIndex: number
  steps: Step[]
  setSteps: Dispatch<SetStateAction<Step[]>>
  progressStep: string
  setProgressStep: Dispatch<SetStateAction<string>>
}

const AddProductProgress = ({
  steps,
  setSteps,
  progressStepIndex,
  progressStep,
  setProgressStep
}: Props) => {
  const handleSetProgressStep = (label: string) => {
    const index = steps.findIndex((step) => step.label == label)
    if (steps[index].status == "success") {
      setProgressStep(label)
    }
    // TODO: Allow skipping future steps
    // else {
    //   const newSteps = [...steps]
    //   steps.slice(progressStepIndex, index - 1).forEach((step, i) => {
    //     const index = i + progressStepIndex
    //     newSteps[index].status = conditions[index] ? "error" : "success"
    //   })
    //   setSteps(newSteps)
    // }

    // switch (progressStepIndex) {
    //   case 0:
    //     isSuccess = checkCondition(name.length == 0 || description.length == 0)
    //     break
    //   case 2:
    //     isSuccess = checkCondition()
    //     break
    // }
  }

  return (
    <ul className="overflow-x-scroll py-4 flex gap-0.5 items-center text-sm font-medium">
      {steps.map(({ status, label }, key) => (
        <li key={key} className="flex gap-0.5 items-center flex-shrink-0">
          <p
            className={`${
              progressStep == label
                ? "border-blue-600 cursor-pointer text-black"
                : status == "success"
                ? "border-green-600 cursor-pointer text-gray-600 hover:text-black"
                : status == "error"
                ? "text-gray-600 border-red-500"
                : "text-gray-600 border-gray-200"
            } px-2 py-0.5 rounded-md border-2 flex-shrink-0`}
            onClick={() => handleSetProgressStep(label)}
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
