import Link from "next/link"

type Props = {
  href: string
  image: JSX.Element
  label: string
  onClick: () => void
}

function DropwdownMenu({ href, image, label, onClick }: Props) {
  return (
    <div onClick={onClick}>
      <Link href={href}>
        <a>
          <div className="px-3 py-2.5 dark:text-white transition-colors duration-150 rounded-md hover:bg-blue-600 hover:text-white flex">
            <div className="mb-1 ml-3">{image}</div>
            <p className="ml-4 font-normal">{label}</p>
          </div>
        </a>
      </Link>
    </div>
  )
}

export default DropwdownMenu
