import { Dispatch, SetStateAction } from "react"

const search = async (
  searchTerm: string,
  data: any[],
  setData: Dispatch<SetStateAction<any[]>>
) => {
  const options = {
    includeScore: true,
    threshold: 0.1,
    keys: ["name", "description"],
  }
  if (searchTerm) {
    const Fuse = (await import("fuse.js")).default
    const fuse = new Fuse(data, options)
    const results = fuse.search(searchTerm)
    const newItems = []
    results.map((el) => newItems.push(el.item))
    setData(newItems)
  } else {
    setData(null)
  }
}

export default search
