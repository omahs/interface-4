import { Dispatch, SetStateAction, useEffect, useState } from "react"
import SliceFormInputBlock from "../SliceFormInputBlock"
import Add from "@components/icons/Add"
import formatNumber from "@utils/formatNumber"
import TransferFormInputSingle from "../TransferFormInputSingle"
import Question from "../Question"

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
  setTotalShares
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
    <div className="grid items-center grid-cols-8 text-left xs:grid-cols-10 md:grid-cols-12 gap-x-4 gap-y-2 xs:gap-y-4">
      <p className="mb-[-25px] text-sm text-gray-700 font-semibold hidden xs:block xs:col-span-5 xs:col-start-2 md:col-span-7 md:col-start-2">
        Addresses
      </p>
      <div className="mb-[-25px] text-gray-700 relative items-center hidden xs:flex">
        <p className="pr-1 text-sm font-semibold">Slices</p>
        <Question
          text={
            <>
              <p>
                The percentage represents the relative amount of total slices
                being transferred.
              </p>
              <p>
                If the number is green, the transfer will make the receiver a
                superowner (not considering any amount of slices already owned).
              </p>
            </>
          }
          position="top-[35px] right-[-35px]"
        />
      </div>
      <p className="col-span-8 pb-2 font-semibold text-center xs:hidden">
        Specify the receiver addresses and the slices to transfer
      </p>
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
            placeholder={`Up to ${formatNumber(ownedSlices) || "..."}`}
          />
        )
      })}

      <div className="flex items-center h-12 col-span-7 col-start-1">
        <Add
          onClick={() => setInputCount(inputCount + 1)}
          className="text-green-600 opacity-75 cursor-pointer sm:ml-3 hover:opacity-100"
        />
      </div>
      <p className="col-span-4 py-3 pr-2 text-right xs:col-span-3 xs:col-end-7 md:col-end-9 md:col-span-3">
        Total slices
      </p>
      <p className="col-span-3 pl-5">{formatNumber(totalShares, 3)}</p>
    </div>
  )
}

export default TransferFormInputBlock
