import Link from "next/link"
import { Button } from "@components/ui"
import DoubleText from "../DoubleText"

const SliceLoad = () => {
  return (
    <>
      <DoubleText
        inactive
        logoText={`Slicing in progress`}
        size="text-4xl sm:text-5xl"
        position="pb-4 sm:pb-6"
      />
      <div className="py-8">
        <Button loading={true} />
      </div>
      <p className="max-w-sm mx-auto pt-7">
        Wait for the operation to complete, or find the slicer later in your{" "}
        <Link href="/profile">
          <a className="font-black highlight">profile section</a>
        </Link>{" "}
      </p>
    </>
  )
}

export default SliceLoad
