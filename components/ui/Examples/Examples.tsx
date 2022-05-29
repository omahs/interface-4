import { Banner, Carousel } from "@components/ui"

const Examples = () => {
  return (
    <Banner color="bg-transparent" id="examples" title="Examples">
      <div className="">
        <p className="max-w-lg mx-auto text-lg">
          Get inspired on how to make the most of slicers and d-stores
        </p>
        <div className="max-w-screen-lg mx-auto md:px-6">
          <Carousel />
        </div>
      </div>
    </Banner>
  )
}

export default Examples
