import { useEffect, Dispatch, SetStateAction, useState } from "react"
import { Input } from "@components/ui"

type Props = {
  index: number
  signerAddress: string
  addresses: string[]
  shares: number[]
  totalShares: number
  minimumShares: number
  setAddresses: Dispatch<SetStateAction<string[]>>
  setShares: Dispatch<SetStateAction<number[]>>
  setTotalShares: Dispatch<SetStateAction<number>>
}

const SliceFormInputBlock = ({
  index,
  signerAddress,
  addresses,
  shares,
  totalShares,
  minimumShares,
  setAddresses,
  setShares,
  setTotalShares,
}: Props) => {
  const [address, setAddress] = useState("")
  const [sharesAmount, setSharesAmount] = useState("")

  const handleChange = (
    value: string | number,
    currentState: string[] | number[],
    setState: Dispatch<SetStateAction<string[] | number[]>>
  ) => {
    let items = currentState
    value ? (items[index] = value) : items.splice(index, 1)
    setState(items)
  }

  useEffect(() => {
    if (index == 0 && signerAddress) {
      setAddress(signerAddress)
      setSharesAmount("1000000")
    }
  }, [signerAddress])

  useEffect(() => {
    handleChange(address, addresses, setAddresses)
  }, [address])

  useEffect(() => {
    handleChange(Number(sharesAmount), shares, setShares)
    setTotalShares(
      shares.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      )
    )
  }, [sharesAmount])

  return (
    <>
      <div className="col-span-6 col-start-2 md:col-span-7 md:col-start-2">
        <Input
          type="string"
          placeholder="0x… / vitalik.eth"
          className="mt-1.5"
          value={address}
          required={sharesAmount && true}
          onChange={setAddress}
        />
      </div>
      <div className="col-span-3">
        <Input
          type="number"
          placeholder="1000000"
          className="mt-1.5"
          value={sharesAmount}
          required={address && true}
          onChange={setSharesAmount}
        />
      </div>
      <div className="flex items-center mt-1.5">
        <p
          className={`col-span-1 text-sm ${
            minimumShares <= Number(sharesAmount) && "text-green-600 font-bold"
          }`}
        >
          {sharesAmount &&
            Math.floor((Number(sharesAmount) / totalShares) * 10000) / 100 +
              "%"}
        </p>
      </div>
    </>
  )
}

export default SliceFormInputBlock
