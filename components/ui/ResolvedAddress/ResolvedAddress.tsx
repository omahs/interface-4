import { useAppContext } from "../context"
import { useEns } from "@utils/resolveEns"

type Props = {
  address: string
  href?: string
}

const ResolvedAddress = ({ address, href }: Props) => {
  const { connector } = useAppContext()
  const resolvedAddress = useEns(connector, address)
  const addressReduced = address.replace(
    address.substring(5, address.length - 3),
    `\xa0\xa0\xa0\xa0\xa0\xa0`
  )

  return (
    <a
      className="highlight"
      href={
        href ||
        `https://${
          process.env.NEXT_PUBLIC_CHAIN_ID === "4" ? "rinkeby." : ""
        }etherscan.io/address/${address}`
      }
      target="_blank"
      rel="noreferrer"
    >
      {resolvedAddress || addressReduced}
    </a>
  )
}

export default ResolvedAddress
