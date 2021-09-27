import { useEns } from "@utils/resolveEns"

type Sponsor = {
  address: string
  amount: number
}

type Props = {
  sponsor: Sponsor
}

const SponsorListItem = ({ sponsor }: Props) => {
  const { address, amount } = sponsor
  const resolvedAddress = useEns(address)
  const addressReduced = address.replace(
    address.substring(5, address.length - 3),
    "___"
  )

  return (
    <li className="flex justify-between pl-2">
      <span>{resolvedAddress || addressReduced}</span>
      <span>Ξ {sponsor.amount / 1000}</span>
    </li>
  )
}

export default SponsorListItem

// Todo: finish styling
