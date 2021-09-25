import Link from "next/link"
import Delete from "@components/icons/Delete"

type Props = {
  label: string
  sideLabel: string
  subLabel: string
  href?: string
  remove?: () => void
}

const ListCard = ({ label, sideLabel, subLabel, href, remove }: Props) => {
  const content = (
    <div className="grid items-center h-16 grid-cols-6 pl-4 pr-2 bg-white border border-gray-100 shadow-base rounded-xl ">
      <div className="flex justify-center mr-2 text-xs">{sideLabel}</div>
      <div className="col-span-4 px-1 text-left">
        <p className="font-medium truncate">{label}</p>
        <p className="text-sm text-gray-400">{subLabel}</p>
      </div>
      <div className="flex justify-center">
        <Delete onClick={() => remove()} />
      </div>
    </div>
  )
  return (
    <div>
      {href ? (
        // todo: Test if this link breaks the page in production
        <Link href={href}>
          <a>{content}</a>
        </Link>
      ) : (
        content
      )}
    </div>
  )
}

export default ListCard
