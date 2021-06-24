import Link from "next/link"
import s from "./UnauthorizedBlock.module.css"
import { Button } from "@components/ui"

const UnauthorizedBlock = () => {
  return (
    <>
      <div className={s.root}>
        <p className="mb-7 text-lg">You cannot access this page</p>
        <Link href="/">
          <Button label="Return to home" />
        </Link>
      </div>
    </>
  )
}

export default UnauthorizedBlock
