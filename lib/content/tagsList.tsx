import CarouselGames from "@components/icons/CarouselGames"
import CarouselArtworks from "@components/icons/CarouselArtworks"
import CarouselMusic from "@components/icons/CarouselMusic"
import CarouselPayments from "@components/icons/CarouselPayments"
import CarouselStartups from "@components/icons/CarouselStartups"
import CarouselWriters from "@components/icons/CarouselWriters"
import CarouselCharity from "@components/icons/CarouselCharity"

export type TagElement = {
  value: string
  colors: {
    text: string
    bg: string
    border: string
  }
  image?: JSX.Element
  name?: string
}

const tagsList: TagElement[] = [
  {
    value: "Artwork",
    colors: {
      text: "text-pink-700",
      bg: "bg-pink-100",
      border: "border-pink-100",
    },
    image: CarouselArtworks("text-pink-700"),
  },
  {
    value: "Company",
    colors: {
      text: "text-blue-700",
      bg: "bg-blue-100",
      border: "border-blue-100",
    },
    image: CarouselStartups("text-blue-700"),
  },
  {
    value: "Game",
    colors: {
      text: "text-purple-700",
      bg: "bg-purple-100",
      border: "border-purple-100",
    },
    image: CarouselGames("text-purple-700"),
  },
  {
    value: "Music",
    colors: {
      text: "text-green-700",
      bg: "bg-green-100",
      border: "border-green-100",
    },
    image: CarouselMusic("text-green-700"),
  },
  {
    value: "Project",
    colors: {
      text: "text-red-700",
      bg: "bg-red-100",
      border: "border-red-100",
    },
    image: CarouselPayments("text-red-700"),
  },
  {
    value: "Writing",
    colors: {
      text: "text-yellow-700",
      bg: "bg-yellow-100",
      border: "border-yellow-100",
    },
    image: CarouselWriters("text-yellow-700"),
  },
  {
    value: "Charity",
    colors: {
      text: "text-cyan-700",
      bg: "bg-cyan-100",
      border: "border-cyan-100",
    },
    image: CarouselCharity("text-cyan-700"),
  },
  {
    value: "Private",
    colors: {
      text: "bg-gray-100 text-gray-700",
      bg: "bg-gray-100",
      border: "border-gray-100",
    },
  },
]

export default tagsList
