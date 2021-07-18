import Link from "next/link"
import { useEffect, useState, Dispatch, SetStateAction } from "react"
import { Input, SliceFormInputBlock, Question } from "@components/ui"
import { initialize } from "@lib/useProvider"
import Add from "@components/icons/Add"

type Props = {
  success: boolean
  addresses: string[]
  shares: number[]
  minimumShares: number
  totalShares: number
  setAddresses: Dispatch<SetStateAction<string[]>>
  setShares: Dispatch<SetStateAction<number[]>>
  setMinimumShares: Dispatch<SetStateAction<number>>
  setTotalShares: Dispatch<SetStateAction<number>>
}

const SliceFormBlockSplitter = ({
  success,
  addresses,
  shares,
  minimumShares,
  totalShares,
  setAddresses,
  setShares,
  setMinimumShares,
  setTotalShares,
}: Props) => {
  const [initAddress, setInitAddress] = useState("")
  const [inputCount, setInputCount] = useState(3)
  const [removedCount, setRemovedCount] = useState(0)

  useEffect(() => {
    const init = async () => {
      const { signerAddress } = await initialize()
      setInitAddress(signerAddress)
      setAddresses([signerAddress])
    }
    init()
  }, [])

  useEffect(() => {
    if (success) {
      resetInputs()
    }
  }, [success])

  const resetInputs = () => {
    setInputCount(3)
    setRemovedCount(0)
    setAddresses([initAddress])
    setShares([1000000])
    setMinimumShares(0)
    setTotalShares(1000000)
  }

  return (
    <div className="grid items-center grid-cols-8 text-left xs:grid-cols-10 md:grid-cols-12 gap-x-4 gap-y-4 xs:gap-y-6">
      <p className="mb-[-25px] text-sm text-gray-700 font-semibold hidden xs:block xs:col-span-5 xs:col-start-2 md:col-span-7 md:col-start-2">
        Addresses (Max. 30)
      </p>
      <div className="mb-[-25px] text-gray-700 relative items-center hidden xs:flex">
        <p className="pr-1 text-sm font-semibold">Shares</p>
        <Question
          text={
            <>
              <p className="pb-4">
                The percentage represents the relative amount of ETH earned by
                the account from all payments made to the slicer.
              </p>
              <p>
                If it&apos;s green, the account possess more than the minimum
                shares amount.
              </p>
            </>
          }
          position="top-[35px] right-[-35px]"
        />
      </div>
      <p className="col-span-8 pb-2 text-lg font-semibold text-center xs:hidden">
        Add up to 30 addresses
      </p>
      {[...Array(inputCount)].map((el, key) => {
        const i = key
        return (
          <SliceFormInputBlock
            key={key}
            index={i}
            signerAddress={initAddress}
            addresses={addresses}
            shares={shares}
            totalShares={totalShares}
            minimumShares={minimumShares}
            removedCount={removedCount}
            setAddresses={setAddresses}
            setShares={setShares}
            setTotalShares={setTotalShares}
            setRemovedCount={setRemovedCount}
          />
        )
      })}
      <div className="col-span-1 col-start-1 mx-auto">
        {inputCount - removedCount < 30 && (
          <Add onClick={() => setInputCount(inputCount + 1)} />
        )}
      </div>
      <p className="col-span-4 py-3 pr-2 text-right xs:col-span-3 xs:col-end-7 md:col-end-9 md:col-span-3">
        Total shares
      </p>
      <p className="col-span-3 pl-5">{totalShares}</p>
      <div className="relative flex justify-end items-center col-span-5 xs:col-end-7 pt-1.5">
        <p className="pr-1">Minimum shares</p>
        <Question
          text={
            <>
              <p className="pb-4">
                Accounts with the chosen amount of shares have{" "}
                <Link href="/">
                  <a className="font-extrabold highlight">privileged access</a>
                </Link>{" "}
                to this slicer.
              </p>
              <p>
                <strong>Note</strong>: At least one account has to hold the
                minimum amount of shares.
              </p>
            </>
          }
        />
      </div>

      <div className="col-span-3 xs:col-span-3 xs:col-start-7 md:col-span-3 md:col-start-8">
        <Input
          type="number"
          placeholder="100000"
          className="mt-1.5"
          required
          onChange={setMinimumShares}
        />
      </div>
      <div className="col-start-6 pl-5 xs:pl-0 xs:col-span-1 flex items-center mt-1.5">
        <p
          className={`text-sm font-bold ${
            minimumShares > totalShares && "text-red-500"
          }`}
        >
          {minimumShares != 0 &&
            totalShares != 0 &&
            Math.floor((minimumShares / totalShares) * 10000) / 100 + "%"}
        </p>
      </div>
    </div>
  )
}

export default SliceFormBlockSplitter
