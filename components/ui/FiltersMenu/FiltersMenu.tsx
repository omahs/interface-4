import dynamic from "next/dynamic"
import Sliders from "@components/icons/Sliders"
import { TagElement } from "@lib/content/tagsList"
import { Dispatch, SetStateAction, useState } from "react"

const FiltersFloatingMenu = dynamic(
  () => import("@components/ui/FiltersFloatingMenu"),
  {
    ssr: false
  }
)

type Props = {
  totalTags: string[]
  filterTags: string[]
  setFilterTags: Dispatch<SetStateAction<string[]>>
  setSearchTerm: Dispatch<SetStateAction<string>>
  showCollectibles: boolean
  setShowCollectibles: Dispatch<SetStateAction<boolean>>
  tagsList: TagElement[]
}

function FiltersMenu({
  totalTags,
  filterTags,
  setFilterTags,
  setSearchTerm,
  showCollectibles,
  setShowCollectibles,
  tagsList
}: Props) {
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className="relative flex justify-end w-full pb-4">
      <button
        className="flex items-center px-6 py-1.5 bg-white border-[1.5px] border-gray-200 rounded-md shadow-base hover:bg-gray-100 transition-colors duration-150"
        onClick={() => {
          sa_event("explore_slicer_open_filter")
          setShowFilters((showFilters) => !showFilters)
        }}
      >
        <Sliders className="w-6 h-6" />
        <p className="pl-3">Filters</p>
      </button>
      {showFilters && (
        <FiltersFloatingMenu
          tagsList={tagsList}
          totalTags={totalTags}
          filterTags={filterTags}
          setFilterTags={setFilterTags}
          setSearchTerm={setSearchTerm}
          showCollectibles={showCollectibles}
          setShowCollectibles={setShowCollectibles}
        />
      )}
    </div>
  )
}

export default FiltersMenu
