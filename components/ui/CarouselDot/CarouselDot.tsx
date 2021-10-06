import { CarouselContext, Dot } from "pure-react-carousel"
import { darkColorList } from "@utils/colorList"
import { useContext, useEffect, useState } from "react"

type Props = {
  title: string
  index: number
}

const CarouselDot = ({ title, index }: Props) => {
  const carouselContext = useContext(CarouselContext)
  const [currentSlide, setCurrentSlide] = useState(
    carouselContext.state.currentSlide
  )

  useEffect(() => {
    const onChange = () => {
      setCurrentSlide(carouselContext.state.currentSlide)
    }
    carouselContext.subscribe(onChange)
    return () => carouselContext.unsubscribe(onChange)
  }, [carouselContext])

  return (
    <Dot
      slide={index}
      className={`${darkColorList[index][5]} ${darkColorList[index][6]} ${
        currentSlide === index
          ? `${darkColorList[index][2]} ${darkColorList[index][7]} shadow-none`
          : "shadow-md hover:shadow-none"
      } border border-gray-200 rounded-full transition-all duration-150`}
    >
      <p className="px-4 py-[5px] truncate">{title}</p>
    </Dot>
  )
}

export default CarouselDot
