import Image from "next/image"
import { darkColorList } from "@utils/colorList"
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext
} from "pure-react-carousel"
import Arrow from "@components/icons/Arrow"
import { CarouselDot } from ".."
import slides from "@lib/content/slides"

const Carousel = () => {
  return (
    <CarouselProvider
      naturalSlideWidth={100}
      naturalSlideHeight={100}
      totalSlides={slides.length}
      visibleSlides={1}
      infinite={true}
      isIntrinsicHeight={true}
      lockOnWindowScroll={true}
    >
      <Slider
        className="pb-5 pt-14 md:pb-2"
        aria-label="Slicers examples"
        trayTag="div"
      >
        {slides.map((slide, key) => (
          <Slide key={key} index={key}>
            <div className="grid items-center grid-cols-1 md:grid-cols-3 md:px-8">
              <div className="relative w-full max-w-lg col-span-2 pb-12 mx-auto text-left md:mx-0 md:py-4 md:pr-4">
                <h1 className={`${darkColorList[key][2]} pb-7`}>
                  {slide.title}
                </h1>
                <div className="space-y-7">
                  <div>
                    <p
                      className={`pb-2 text-sm uppercase tracking-wide font-medium ${darkColorList[key][2]}`}
                    >
                      Slicer
                    </p>
                    <div className="prose">{slide.contentSlicer}</div>
                  </div>
                  <div>
                    <p
                      className={`text-sm uppercase tracking-wide font-medium ${darkColorList[key][2]}`}
                    >
                      d-store
                    </p>
                    <div className="prose">
                      <ul>{slide.contentStore}</ul>
                    </div>
                  </div>
                  {slide.contentExamples && (
                    <div>
                      <p
                        className={`text-sm uppercase tracking-wide font-medium ${darkColorList[key][2]}`}
                      >
                        examples
                      </p>
                      <div className="prose">
                        <ul>{slide.contentExamples}</ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="relative w-48 h-48 p-8 mx-auto border border-gray-200 shadow-lg md:p-10 sm:w-56 sm:h-56 rounded-xl">
                {slide.imageSrc ? (
                  slide.isNFT ? (
                    <Image
                      src={slide.imageSrc}
                      alt={`${slide.title} image`}
                      unoptimized={true}
                      placeholder="blur"
                      fill
                      className="object-cover "
                      style={{ imageRendering: "pixelated" }}
                    />
                  ) : (
                    <Image
                      src={slide.imageSrc}
                      alt={`${slide.title} image`}
                      fill
                      placeholder="blur"
                      className="object-cover"
                    />
                  )
                ) : (
                  <div className="relative flex items-center justify-center w-full h-full">
                    {slide.imageContent(darkColorList[key][2])}
                  </div>
                )}
              </div>
            </div>
          </Slide>
        ))}
      </Slider>
      <div className="space-x-8 md:px-8 md:text-left">
        <ButtonBack>
          <div className="group p-2.5 border border-gray-200 rounded-full hover:border-black duration-150 transition-all shadow-md hover:shadow-none my-2">
            <Arrow className="text-gray-500 transition-colors duration-150 rotate-180 group-hover:text-black" />
          </div>
        </ButtonBack>
        <ButtonNext>
          <div className="group p-2.5 border border-gray-200 rounded-full hover:border-gray-700 duration-150 transition-all shadow-md hover:shadow-none my-2">
            <Arrow className="text-gray-500 transition-colors duration-150 group-hover:text-black" />
          </div>
        </ButtonNext>
      </div>
      <div className="grid grid-cols-2 gap-4 pt-10 sm:grid-cols-4">
        {slides.map((slide, key) => (
          <CarouselDot key={key} index={key} title={slide.title} />
        ))}
      </div>
      <p className="pt-12">
        <a
          className="highlight"
          href="https://slicedao.notion.site/Slicer-examples-668ffdc77037498d9818b40d8213ade4"
          target="_blank"
          rel="noreferrer"
        >
          See more examples
        </a>
      </p>
    </CarouselProvider>
  )
}

export default Carousel

// todo: substitute pure-react-carousel with glidejs --> https://glidejs.com/docs/
