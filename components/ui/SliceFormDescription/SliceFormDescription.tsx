import DoubleText from "../DoubleText"

const SliceFormDescription = () => {
  return (
    <>
      <div className="py-6 mx-auto space-y-4 sm:px-6 max-w-screen-xs md:text-left">
        <div className="pb-4 prose">
          <p>
            <b>Slicers are collaborative on-chain stores.</b>
          </p>
          <p>
            Owners can use them to sell any product in any currency, fully
            on-chain, and to split payments between multiple addresses.
          </p>
          <p>
            <DoubleText inactive logoText="Slices 🍰" size="text-normal" />{" "}
            represent ownership over a slicer and its earnings.
          </p>
        </div>
      </div>
    </>
  )
}

export default SliceFormDescription
