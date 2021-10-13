import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { MySwitch } from ".."

type Props = {
  label: string
  filterTags: string[]
  setFilterTags: Dispatch<SetStateAction<string[]>>
}

function FiltersElement({ label, setFilterTags }: Props) {
  const [element, setElement] = useState(true)

  // useEffect(() => {
  //   if (element) {

  //   }
  // }, [element])

  return (
    <div className="flex items-center justify-end space-x-4">
      <p>{label}</p>
      <MySwitch enabled={element} setEnabled={setElement} />
    </div>
  )
}

export default FiltersElement

// todo: Finish this
