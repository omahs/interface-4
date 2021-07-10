import { useEffect, Dispatch, SetStateAction, useState } from "react"
import { Input } from "@components/ui"

type Props = {
  index: number
  signerAddress: string
  addresses: string[]
  shares: number[]
  setAddresses: Dispatch<SetStateAction<string[]>>
  setShares: Dispatch<SetStateAction<number[]>>
}

const SliceFormInputBlock = ({
  index,
  signerAddress,
  addresses,
  shares,
  setAddresses,
  setShares,
}: Props) => {
  const [address, setAddress] = useState("")
  const [sharesAmount, setSharesAmount] = useState(null)

  const handleChange = (
    value: string | number,
    currentState: string[] | number[],
    setState: Dispatch<SetStateAction<string[] | number[]>>
  ) => {
    let items = currentState
    items[index] = value
    setState(items)
  }

  useEffect(() => {
    if (index == 0 && signerAddress) {
      setAddress(signerAddress)
      setSharesAmount(1000000)
    }
  }, [signerAddress])

  useEffect(() => {
    handleChange(address, addresses, setAddresses)
  }, [address])

  useEffect(() => {
    handleChange(Number(sharesAmount), shares, setShares)
  }, [sharesAmount])

  return (
    <>
      <div className="col-span-6 col-start-2 sm:col-span-7 sm:col-start-2">
        <Input
          type="string"
          placeholder="0x… / vitalik.eth"
          className="mt-1.5"
          value={address}
          onChange={setAddress}
        />
      </div>
      <div className="col-span-4 sm:col-span-3">
        <Input
          type="number"
          placeholder="1000000"
          className="mt-1.5"
          value={sharesAmount}
          onChange={setSharesAmount}
        />
      </div>
    </>
  )
}

export default SliceFormInputBlock
