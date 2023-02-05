import { StrategyParams } from "@components/priceStrategies/strategies"
import { Step } from "pages/slicer/[id]/products/new"
import { Dispatch, SetStateAction } from "react"

type Props = {
  name: string
  description: string
  steps: Step[]
  priceParams: StrategyParams
  progressStep: string
  setSteps: Dispatch<SetStateAction<Step[]>>
  setProgressStep: Dispatch<SetStateAction<string>>
}

const AddProductProgress = ({
  name,
  description,
  steps,
  setSteps,
  priceParams,
  progressStep,
  setProgressStep
}: Props) => {
  const validations = {
    0: name.length == 0 || description.length == 0,
    2:
      priceParams?.label?.includes("VRGDA") &&
      priceParams?.args &&
      (Number(priceParams?.args[1]) == 0 ||
        Number(priceParams?.args[0][0][0]) == 0 ||
        Number(priceParams?.args[0][0][2]) == 0)
  }

  const handleSetProgressStep = (label: string) => {
    const newIndex = steps.findIndex((step) => step.label == label)
    const lastCheckedIndex = steps.findIndex((step) => step.status == "")
    const index = newIndex > lastCheckedIndex ? newIndex : lastCheckedIndex

    const newSteps = [...steps]
    steps.slice(0, index).forEach((step, i) => {
      newSteps[i].status = validations[i] ? "error" : "success"
    })
    setSteps(newSteps)
    setProgressStep(label)
  }

  return (
    <ul className="flex items-center py-4 overflow-x-scroll text-sm font-medium">
      {steps.map(({ status, label }, key) => (
        <li key={key} className="flex items-center flex-shrink-0">
          <p
            className={`${
              progressStep == label
                ? "border-blue-600 text-black"
                : status == "success"
                ? "border-green-600 text-gray-600"
                : status == "error"
                ? "text-gray-600 border-red-500"
                : "text-gray-600 border-gray-200"
            } px-2 py-0.5 rounded-md border-2 flex-shrink-0 cursor-pointer hover:text-black`}
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
