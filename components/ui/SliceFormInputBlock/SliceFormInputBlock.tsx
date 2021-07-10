import { Dispatch, SetStateAction, useState } from "react"
import { Input } from "@components/ui"

type Props = {
  key: number
  addresses: string[]
  shares: number[]
  setAddresses: Dispatch<SetStateAction<string[]>>
  setShares: Dispatch<SetStateAction<number[]>>
}

const SliceFormInputBlock = ({
  key,
  addresses,
  shares,
  setAddresses,
  setShares,
}: Props) => {
  const [address, setAddress] = useState("")
  const [sharesAmount, setSharesAmount] = useState(null)

  // Todo: This
  const handleChange = (
    e: React.SyntheticEvent<EventTarget>,
    setValue: Dispatch<SetStateAction<string | number>>,
    currentState: string[] | number[],
    setState: Dispatch<SetStateAction<string[] | number[]>>
  ) => {
    setValue(e)
    let items = currentState
    items[key] = "newName"
    setState(items)
  }

  return (
    <>
      <div className="col-span-6 col-start-2 sm:col-span-7 sm:col-start-2">
        <Input
          type="string"
          placeholder="0x… / vitalik.eth"
          className="mt-1.5"
          value={address}
          onChange={(e: React.SyntheticEvent<EventTarget>) =>
            handleChange(e, setAddress, addresses, setAddresses)
          }
        />
      </div>
      <div className="col-span-4 sm:col-span-3">
        <Input
          type="number"
          placeholder="1000000"
          className="mt-1.5"
          value={sharesAmount}
          onChange={(e: React.SyntheticEvent<EventTarget>) =>
            handleChange(e, setSharesAmount, shares, setShares)
          }
        />
      </div>
    </>
  )
}

export default SliceFormInputBlock
