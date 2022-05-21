import DoubleText from "../DoubleText"

const SliceFormDescription = () => {
  return (
    <div className="py-6 mx-auto space-y-4 text-center sm:px-6 max-w-screen-xs md:text-left">
      <p>
        Slicers split any payment received to their owners, proportionally to
        number of slices held.
      </p>
      <p>
        Slices are{" "}
        <DoubleText
          inactive
          logoText="tradable, fractionalized NFTs"
          size="text-normal"
        />{" "}
        (ERC1155 tokens) that represent ownership over a slicer.
      </p>
    </div>
  )
}

export default SliceFormDescription
