import Link from "next/link"
import { Dispatch, SetStateAction } from "react"
import { Question } from ".."
import CarouselGames from "@components/icons/CarouselGames"
import CarouselArtworks from "@components/icons/CarouselArtworks"
import CarouselMusic from "@components/icons/CarouselMusic"
import CarouselPayments from "@components/icons/CarouselPayments"
import CarouselStartups from "@components/icons/CarouselStartups"
import CarouselWriters from "@components/icons/CarouselWriters"

type Props = {
  tags: string
  newTags: string
  setNewTags: Dispatch<SetStateAction<string>>
  editMode: boolean
}

type TagElement = {
  value: string
  colors: string
  image?: JSX.Element
  name?: string
}

export const tagsList: TagElement[] = [
  {
    value: "Artwork",
    colors: "bg-pink-100 text-pink-700",
    image: CarouselArtworks("text-pink-700"),
  },
  {
    value: "Company",
    colors: "bg-blue-100 text-blue-700",
    image: CarouselStartups("text-blue-700"),
  },
  {
    value: "Game",
    colors: "bg-purple-100 text-purple-700",
    image: CarouselGames("text-purple-700"),
  },
  {
    value: "Music",
    colors: "bg-green-100 text-green-700",
    image: CarouselMusic("text-green-700"),
  },
  {
    value: "Project",
    colors: "bg-red-100 text-red-700",
    image: CarouselPayments("text-red-700"),
  },
  {
    value: "Writing",
    colors: "bg-yellow-100 text-yellow-700",
    image: CarouselWriters("text-yellow-700"),
  },
  {
    value: "Private",
    colors: "bg-gray-100 text-gray-700",
  },
]

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
                <p className="pb-4">
                  Tags will be used to make your slicer relevant when searched
                  through the{" "}
                  <Link href="/slicer">
                    <a>Explore</a>
                  </Link>{" "}
                  section
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
  ) : (
    tags && (
      <p
        className={`nightwind-prevent mb-8 inline-block px-6 py-1.5 text-sm font-semibold ${currentTag.colors} rounded-md shadow-sm`}
      >
        {currentTag.name || currentTag.value}
      </p>
    )
  )
}

export default SlicerTags
