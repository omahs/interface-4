import { useEffect, Dispatch, SetStateAction, useState } from "react"
import { Input } from "@components/ui"
import Delete from "@components/icons/Delete"
import UserIcon from "@components/icons/UserIcon"
import { useAppContext } from "@components/ui/context"

type Props = {
  index: number
  signerAddress: string
  addresses: string[]
  shares: number[]
  totalShares: number
  minimumShares: number
  removedCount: number
  setAddresses: Dispatch<SetStateAction<string[]>>
  setShares: Dispatch<SetStateAction<number[]>>
  setTotalShares: Dispatch<SetStateAction<number>>
  setRemovedCount: Dispatch<SetStateAction<number>>
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
  removedCount,
  setRemovedCount,
}: Props) => {
  const { account } = useAppContext()
  const [visible, setVisible] = useState(true)
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

  const handleRemove = () => {
    let tempShares = shares
    let tempAddresses = addresses
    setSharesAmount("")
    tempAddresses.splice(index, 1)
    setShares(tempShares)
    setAddresses(tempAddresses)
    setVisible(false)
    setRemovedCount(removedCount + 1)
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
    visible && (
      <>
        <div className="col-span-1 col-start-1 mt-1.5 mx-auto">
          <div className="">
            {index === 0 ? (
              account === address ? (
                <UserIcon
                  className={
                    minimumShares <= Number(sharesAmount) && "text-green-500"
                  }
                />
              ) : null
            ) : (
              <Delete onClick={handleRemove} />
            )}
          </div>
        </div>
        <div className="col-span-7 xs:col-span-5 md:col-span-7">
          <Input
            type="string"
            placeholder="0x… / vitalik.eth"
            className="mt-1.5"
            value={address}
            required={sharesAmount && true}
            onChange={setAddress}
          />
        </div>
        <p className="col-span-2 pt-1.5 pr-2 text-right xs:hidden">Shares</p>
        <div className="col-span-4 xs:col-span-3">
          <Input
            type="number"
            placeholder="1000000"
            className="mt-1.5"
            value={sharesAmount}
            required={address && true}
            onChange={setSharesAmount}
          />
        </div>
        <div className="mt-1.5">
          <p
            className={`col-span-2 xs:col-span-1 text-sm ${
              minimumShares <= Number(sharesAmount) &&
              "text-green-600 font-bold"
            }`}
          >
            {sharesAmount &&
              Math.floor((Number(sharesAmount) / totalShares) * 10000) / 100 +
                "%"}
          </p>
        </div>
        <hr className="col-span-8 mt-6 mb-4 border-gray-300 xs:hidden" />
      </>
    )
  )
}

export default SliceFormInputBlock
