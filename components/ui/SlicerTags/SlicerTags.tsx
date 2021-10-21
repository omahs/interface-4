import tagsList from "@lib/content/tagsList"
import Link from "next/link"
import { Dispatch, SetStateAction } from "react"
import { Question } from ".."

type Props = {
  tags: string
  newTags: string
  setNewTags: Dispatch<SetStateAction<string>>
  editMode: boolean
}

const SlicerTags = ({ tags, newTags, setNewTags, editMode }: Props) => {
  const currentTag = tagsList.find((el) => el.value === tags)
  // const [input, setInput] = useState("")

  // const onKeyDown = (e) => {
  //   const { key } = e
  //   const trimmedInput = input.trim()

  //   if (key === "," && trimmedInput.length && !tags.includes(trimmedInput)) {
  //     e.preventDefault()
  //     setTags((prevState) => [...prevState, trimmedInput])
  //     setInput("")
  //   }
  // }

  return editMode ? (
    <div className="container pt-4">
      {/* {tags.map((tag, key) => (
        <div key={key}>
          <p>{tag}</p>
        </div>
      ))} */}
      <label>
        <div className="relative flex items-center pb-2">
          <p className={`text-sm font-semibold text-left pr-1 `}>Tag</p>
          <Question
            text={
              <>
                <p>
                  Tags will be used to make your slicer relevant when searched
                  through the{" "}
                  <Link href="/slicer">
                    <a>Explore section</a>
                  </Link>{" "}
                </p>
                <p>
                  <strong>Note:</strong> Pick <b>Private</b> if you wish your
                  slicer not to appear in the Explore section. The slicer will
                  still be publicly accessible through the url.
                </p>
              </>
            }
          />
        </div>
        <select
          className="w-full appearance-none focus:outline-none shadow-light-focusable ease-in-out pl-5 py-2 pr-4 text-black transition-all duration-150 bg-white border-b-[3px] border-blue-300 focus:border-sky-600 rounded-sm disabled:text-gray-500 disabled:border-blue-100 disabled:bg-gray-50"
          value={newTags}
          // onKeyDown={onKeyDown}
          onChange={(e) => setNewTags(e.target.value)}
        >
          <option value="">Pick an option...</option>
          {tagsList.map((el, key) => (
            <option key={key} value={el.value}>
              {el.name || el.value}
            </option>
          ))}
        </select>
      </label>
    </div>
  ) : tags ? (
    <p
      className={`nightwind-prevent mb-8 inline-block px-6 py-1.5 text-sm font-semibold ${currentTag.colors.text} ${currentTag.colors.bg} rounded-md shadow-sm`}
    >
      {currentTag.name || currentTag.value}
    </p>
  ) : null
}

export default SlicerTags
