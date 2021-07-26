import Link from "next/link"
import { Button } from "@components/ui"

const SliceLoad = () => {
  return (
    <>
      <h2>Slicing in progress</h2>
      <p className="py-6">Please wait</p>
      <div className="py-1">
        <Button loading={true} />
      </div>
      <p className="pt-7">
        Or find it later in your{" "}
        <Link href="/profile">
          <a className="font-black highlight">profile</a>
        </Link>{" "}
        section
      </p>
    </>
  )
}

export default SliceLoad
