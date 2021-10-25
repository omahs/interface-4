import { Dispatch, SetStateAction } from "react"

type Props = {
  label: string
  isActive: boolean
  colors: {
    text: string
    bg: string
    border: string
  }
  filterTags: string[]
  setFilterTags: Dispatch<SetStateAction<string[]>>
}

function FiltersElement({
  label,
  isActive,
  colors,
  filterTags,
  setFilterTags,
}: Props) {
  const { text, bg, border } = colors

  const newTags = isActive
    ? filterTags
        .slice(0, filterTags.indexOf(label))
        .concat(filterTags.slice(filterTags.indexOf(label) + 1))
    : filterTags.concat([label])

  return (
    <button
      className={`text-sm px-4 py-[3px] cursor-pointer border-[1.5px] rounded-full transition-all shadow-sm duration-150 ${border} ${text} ${
        isActive ? bg : "shadow-none"
      }`}
      onClick={() => setFilterTags(newTags)}
    >
      {label || "Other"}
    </button>
  )
}

export default FiltersElement
