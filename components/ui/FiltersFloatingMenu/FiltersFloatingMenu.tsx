import { TagElement } from "@lib/content/tagsList"
import { Dispatch, SetStateAction } from "react"
import { FiltersElement, Input, MySwitch } from ".."

type Props = {
  totalTags: string[]
  filterTags: string[]
  setFilterTags: Dispatch<SetStateAction<string[]>>
  setSearchTerm: Dispatch<SetStateAction<string>>
  showCollectibles: boolean
  setShowCollectibles: Dispatch<SetStateAction<boolean>>
  tagsList: TagElement[]
}

function FiltersFloatingMenu({
  totalTags,
  filterTags,
  setFilterTags,
  setSearchTerm,
  showCollectibles,
  setShowCollectibles,
  tagsList,
}: Props) {
  const allTagsEnabled = filterTags.length === totalTags.length
  return (
    <div className="absolute top-0 right-0 z-20 px-4 py-6 mt-16 space-y-8 text-black transition-opacity duration-200 bg-white nightwind-prevent w-80 rounded-xl shadow-base nightwind-prevent-block">
      <div className="flex flex-wrap items-center justify-end gap-3">
        {totalTags.map((el, key) => {
          const currentTag = tagsList.find((tag) => tag.value == el) || {
            colors: {
              text: "text-gray-700",
              bg: "bg-gray-100",
              border: "border-gray-100",
            },
          }
          return (
            <FiltersElement
              key={key}
              label={el}
              isActive={filterTags.includes(el)}
              colors={currentTag.colors}
              filterTags={filterTags}
              setFilterTags={setFilterTags}
            />
          )
        })}
      </div>
      <div className="flex items-center justify-end space-x-4">
        <p>All categories</p>
        <MySwitch
          enabled={allTagsEnabled}
          setEnabled={() =>
            allTagsEnabled ? setFilterTags([]) : setFilterTags(totalTags)
          }
        />
      </div>
      <div className="flex items-center justify-end space-x-4">
        <p>Only collectibles</p>
        <MySwitch enabled={showCollectibles} setEnabled={setShowCollectibles} />
      </div>
      <div>
        <Input
          onChange={setSearchTerm}
          placeholder="Search by name or description..."
        />
      </div>
    </div>
  )
}

export default FiltersFloatingMenu
