import Sliders from "@components/icons/Sliders"
import { Dispatch, SetStateAction, useState } from "react"
import { FiltersElement, Input, MySwitch } from ".."
import { tagsList } from "../SlicerTags/SlicerTags"

type Props = {
  filterTags: string[]
  setFilterTags: Dispatch<SetStateAction<string[]>>
  setSearchTerm: Dispatch<SetStateAction<string>>
  showCollectibles: boolean
  setShowCollectibles: Dispatch<SetStateAction<boolean>>
}

function FiltersMenu({
  filterTags,
  setFilterTags,
  setSearchTerm,
  showCollectibles,
  setShowCollectibles,
}: Props) {
  const [showFilters, setShowFilters] = useState(false)
  const totalTags = tagsList.map((tag) => tag["value"])

  return (
    <div className="relative flex justify-end w-full pb-4">
      <button
        className="flex items-center px-6 py-1.5 bg-white border-[1.5px] border-white rounded-md shadow-base hover:bg-gray-100 transition-colors duration-150"
        onClick={() => setShowFilters((showFilters) => !showFilters)}
      >
        <Sliders className="w-6 h-6" />
        <p className="pl-3">Filters</p>
      </button>
      {showFilters && (
        <div className="absolute top-0 right-0 z-20 px-4 py-6 mt-16 space-y-6 transition-opacity duration-200 bg-white w-80 rounded-xl shadow-base nightwind-prevent-block">
          {totalTags.map((el, key) => (
            <FiltersElement
              key={key}
              label={el}
              filterTags={filterTags}
              setFilterTags={setFilterTags}
            />
          ))}
          <div className="flex items-center justify-end space-x-4">
            <p>Only collectibles</p>
            <MySwitch
              enabled={showCollectibles}
              setEnabled={setShowCollectibles}
            />
          </div>
          <div>
            <Input
              onChange={setSearchTerm}
              placeholder="Search by name or description..."
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default FiltersMenu
