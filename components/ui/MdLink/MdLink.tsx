import Link from "next/link"

type Props = {
  label: string
  url: string
  ext: boolean
}

const MdLink = ({ label, url, ext = true }: Props) => {
  return ext ? (
    <a href={url} target="_blank" rel="noreferrer">
      {label}
    </a>
  ) : (
    <Link href={url}>
      <a>{label}</a>
    </Link>
  )
}

export default MdLink
