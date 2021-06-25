import Link from "next/link"
import s from "./UnauthorizedBlock.module.css"
import { Button } from "@components/ui"

const UnauthorizedBlock = () => {
  return (
    <>
      <div className={s.root}>
        <p className="mb-7 text-lg">You cannot access this page</p>
        <Button label="Return to home" href="/" />
      </div>
    </>
  )
}

export default UnauthorizedBlock
