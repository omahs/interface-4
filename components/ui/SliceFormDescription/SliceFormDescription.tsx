import DoubleText from "../DoubleText"

const SliceFormDescription = () => {
  return (
    <>
      <div className="py-6 mx-auto space-y-4 sm:px-6 max-w-screen-xs md:text-left">
        <div className="pb-4 prose">
          <p>
            <b>Slices 🍰</b> are transferable ERC1155 tokens which represent
            ownership over the slicer and its earnings.
          </p>
          <p>
            Choose the initial owners by assigning an amount of slices to each.
          </p>
        </div>
      </div>
    </>
  )
}

export default SliceFormDescription
