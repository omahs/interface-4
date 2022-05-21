import Link from "next/link"
import { useEffect, useState, Dispatch, SetStateAction } from "react"
import { Input, SliceFormInputBlock, Question } from "@components/ui"
import Add from "@components/icons/Add"
import { useAppContext } from "@components/ui/context"
import DoubleText from "../DoubleText"
import formatNumber from "@utils/formatNumber"
import MySwitch from "../MySwitch"

type Props = {
  success: boolean
  addresses: string[]
  shares: number[]
  minimumShares: number
  totalShares: number
  isImmutable: boolean
  setAddresses: Dispatch<SetStateAction<string[]>>
  setShares: Dispatch<SetStateAction<number[]>>
  setMinimumShares: Dispatch<SetStateAction<number>>
  setTotalShares: Dispatch<SetStateAction<number>>
  setisImmutable: Dispatch<SetStateAction<boolean>>
  hasMinimumShares: boolean
}

const SliceFormBlockSplitter = ({
  success,
  addresses,
  shares,
  minimumShares,
  totalShares,
  isImmutable,
  setAddresses,
  setShares,
  setMinimumShares,
  setTotalShares,
  setisImmutable,
  hasMinimumShares
}: Props) => {
  const { account } = useAppContext()
  const [initAddress, setInitAddress] = useState("")
  const [inputCount, setInputCount] = useState(2)
  const [removedCount, setRemovedCount] = useState(0)

  useEffect(() => {
    setInitAddress(account)
  }, [account])

  useEffect(() => {
    if (success) {
      resetInputs()
    }
  }, [success])

  const resetInputs = () => {
    setInputCount(2)
    setRemovedCount(0)
    setAddresses([initAddress])
    setShares([1000000])
    setMinimumShares(0)
    setTotalShares(1000000)
  }

  return (
    <div>
      <div className="grid items-center grid-cols-8 text-left xs:grid-cols-10 md:grid-cols-12 gap-x-4 gap-y-4 xs:gap-y-6">
        <p className="mb-[-25px] text-sm text-gray-700 font-semibold hidden xs:block xs:col-span-5 xs:col-start-2 md:col-span-7 md:col-start-2">
          Addresses
        </p>
        <div className="mb-[-25px] text-gray-700 relative items-center hidden xs:flex">
          <p className="pr-1 text-sm font-semibold">Slices</p>
          <Question
            text={
              <>
                <p>
                  The percentage represents the relative amount of ETH earned by
                  the account from all payments made to the slicer.
                </p>
                <p>
                  If it&apos;s green, the account holds more than the minimum
                  slices amount.
                </p>
              </>
            }
            position="top-[35px] right-[-35px]"
          />
        </div>
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

        <div className="col-span-1 col-start-1 mx-auto ">
          <Add onClick={() => setInputCount(inputCount + 1)} />
        </div>

        <div className="col-span-7 py-3 pr-2 text-left text-green-500 xs:col-span-6 md:col-span-6">
          <p
            className="inline-block font-semibold opacity-75 cursor-pointer hover:opacity-100"
            onClick={() => setInputCount(inputCount + 1)}
          >
            Add slicer owner
          </p>
        </div>

        <div className="relative flex items-center justify-end col-span-5 pb-3 xs:col-end-7">
          <p className="pr-1">Superowner slices</p>
          <Question
            text={
              <>
                <p>
                  Accounts with more than the chosen amount of slices will be{" "}
                  <a
                    className="font-black highlight"
                    href="/#superowner"
                    target="_blank"
                    rel="noreferrer"
                  >
                    superowners with privileged access
                  </a>{" "}
                  to the slicer.
                </p>
                <p className="font-bold">
                  Superowners can edit slicer metadata and sell products
                  onchain.
                </p>
              </>
            }
          />
        </div>

        <div className="col-span-3 xs:col-span-3 xs:col-start-7 md:col-span-3 md:col-start-8">
          <Input
            type="number"
            placeholder="100000"
            error={minimumShares > totalShares || minimumShares < 0}
            required
            onChange={setMinimumShares}
            min={1}
          />
        </div>
        <div className="flex items-center col-start-6 pl-5 mb-3 xs:pl-0 xs:col-span-1">
          <p
            className={`text-sm font-bold ${
              minimumShares > totalShares ? "text-red-500" : ""
            }`}
          >
            {minimumShares != 0 &&
              totalShares != 0 &&
              Math.floor((minimumShares / totalShares) * 10000) / 100 + "%"}
          </p>
        </div>
        <div className="relative flex items-center justify-end col-span-5 xs:col-end-7">
          <p className="pr-1">Immutable metadata</p>
          <Question
            text={
              <>
                <p>
                  If enabled, as a creator you will be able to set the metadata{" "}
                  <b>only once</b> after creating the slicer, thus making it
                  immutable.
                </p>
                <p>It should be enabled if:</p>
                <ul>
                  <li>
                    <b>The slicer is a collectible asset</b> whose metadata
                    should not change once created
                  </li>
                  <li>
                    Superowners should not be able to edit the metadata at their
                    discretion (useful for community-owned slicers)
                  </li>
                </ul>
                <p>
                  <b>Note:</b> Slicers metadata are currently stored on Slice
                  servers, not on IPFS.
                </p>
              </>
            }
          />
        </div>
        <div>
          <MySwitch enabled={isImmutable} setEnabled={setisImmutable} />
        </div>
      </div>
    </div>
  )
}

export default SliceFormBlockSplitter
