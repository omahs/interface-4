import { Dispatch, SetStateAction, useEffect, useState } from "react"
import SliceFormInputBlock from "../SliceFormInputBlock"
import Add from "@components/icons/Add"
import formatNumber from "@utils/formatNumber"
import TransferFormInputSingle from "../TransferFormInputSingle"

type Props = {
  batchMode: boolean
  addresses: string[]
  shares: number[]
  totalShares: number
  ownedSlices: number
  totalSlices: number
  minimumSlices: number
  setAddresses: Dispatch<SetStateAction<string[]>>
  setShares: Dispatch<SetStateAction<number[]>>
  setTotalShares: Dispatch<SetStateAction<number>>
}

const TransferFormInputBlock = ({
  batchMode,
  addresses,
  shares,
  totalShares,
  ownedSlices,
  totalSlices,
  minimumSlices,
  setAddresses,
  setShares,
  setTotalShares,
}: Props) => {
  const [inputCount, setInputCount] = useState(3)
  const [removedCount, setRemovedCount] = useState(0)

  return !batchMode ? (
    <TransferFormInputSingle
      addresses={addresses}
      shares={shares}
      ownedSlices={ownedSlices}
      setAddresses={setAddresses}
      setShares={setShares}
      setTotalShares={setTotalShares}
    />
  ) : (
    <div className="grid items-center grid-cols-8 text-left xs:grid-cols-10 md:grid-cols-12 gap-x-4 gap-y-4 xs:gap-y-6">
      {[...Array(inputCount)].map((el, key) => {
        return (
          <SliceFormInputBlock
            key={key}
            index={Number(key)}
            addresses={addresses}
            shares={shares}
            totalShares={totalSlices}
            minimumShares={minimumSlices}
            removedCount={removedCount}
            setAddresses={setAddresses}
            setShares={setShares}
            setTotalShares={setTotalShares}
            setRemovedCount={setRemovedCount}
            ownedSlices={ownedSlices}
          />
        )
      })}
      <div className="col-span-1 col-start-1 mx-auto">
        <Add onClick={() => setInputCount(inputCount + 1)} />
      </div>
      <p className="col-span-4 py-3 pr-2 text-right xs:col-span-3 xs:col-end-7 md:col-end-9 md:col-span-3">
        Total slices
      </p>
      <p className="col-span-3 pl-5">{formatNumber(totalShares, 3)}</p>
    </div>
  )
}

export default TransferFormInputBlock
