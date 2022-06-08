import { useAppContext } from "../context"
import resolveEns from "@utils/resolveEns"
import { useEffect, useState } from "react"

type Props = {
  address: string
  href?: string
}

const ResolvedAddress = ({ address, href }: Props) => {
  const { provider } = useAppContext()
  const [resolvedAddress, setResolvedAddress] = useState("")
  const addressReduced = address.replace(
    address.substring(5, address.length - 3),
    `\xa0\xa0\xa0\xa0\xa0\xa0`
  )

  useEffect(() => {
    resolveEns(provider, address, setResolvedAddress)
  }, [])

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
