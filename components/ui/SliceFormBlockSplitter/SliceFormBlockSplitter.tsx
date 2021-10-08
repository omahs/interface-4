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
  isCollectible: boolean
  setAddresses: Dispatch<SetStateAction<string[]>>
  setShares: Dispatch<SetStateAction<number[]>>
  setMinimumShares: Dispatch<SetStateAction<number>>
  setTotalShares: Dispatch<SetStateAction<number>>
  setIsCollectible: Dispatch<SetStateAction<boolean>>
}

const SliceFormBlockSplitter = ({
  success,
  addresses,
  shares,
  minimumShares,
  totalShares,
  isCollectible,
  setAddresses,
  setShares,
  setMinimumShares,
  setTotalShares,
  setIsCollectible,
}: Props) => {
  const { account } = useAppContext()
  const [initAddress, setInitAddress] = useState("")
  const [inputCount, setInputCount] = useState(3)
  const [removedCount, setRemovedCount] = useState(0)

  useEffect(() => {
    setInitAddress(account)
    setAddresses([account])
  }, [account])

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
    <div>
      <div className="grid items-center grid-cols-8 text-left xs:grid-cols-10 md:grid-cols-12 gap-x-4 gap-y-4 xs:gap-y-6">
        <p className="mb-[-25px] text-sm text-gray-700 font-semibold hidden xs:block xs:col-span-5 xs:col-start-2 md:col-span-7 md:col-start-2">
          Addresses (Max. 30)
        </p>
        <div className="mb-[-25px] text-gray-700 relative items-center hidden xs:flex">
          <p className="pr-1 text-sm font-semibold">Slices</p>
          <Question
            text={
              <>
                <p className="pb-4">
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
        <p className="col-span-8 pb-2 font-semibold text-center xs:hidden">
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
          Total slices
        </p>
        <p className="col-span-3 pl-5">{formatNumber(totalShares, 3)}</p>
        <div className="relative flex items-center justify-end col-span-5 pb-3 xs:col-end-7">
          <p className="pr-1">Minimum slices</p>
          <Question
            text={
              <>
                <p className="pb-4">
                  Accounts with more than the chosen amount of slices will be{" "}
                  <Link href="/#superowner">
                    <a className="font-black highlight">
                      superowners with privileged access
                    </a>
                  </Link>{" "}
                  to this slicer.
                </p>
                <p className="pb-4">
                  They can edit the slicer page, add products, access restricted
                  information, update data on the blockchain, and use other
                  future features.
                </p>
                <p>
                  <strong>Note</strong>: At least one account has to hold the
                  minimum amount of slices.
                </p>
              </>
            }
          />
        </div>

        <div className="col-span-3 xs:col-span-3 xs:col-start-7 md:col-span-3 md:col-start-8">
          <Input
            type="number"
            placeholder="100000"
            error={minimumShares > totalShares}
            required
            onChange={setMinimumShares}
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
          <p className="pr-1">Collectible asset</p>
          <Question
            text={
              <>
                <p className="pb-4">
                  If enabled, as a creator you will be able to set the metadata{" "}
                  <b>only once</b> after creating the slicer, thus granting it
                  immutability.
                </p>
                <p className="pb-4">
                  It should be enabled if you&apos;re using the slicer as a
                  typical NFT — representing an image (in the future also
                  animation, music, artwork, or any digital asset) that should
                  not change once created.
                </p>
                <p>
                  <b>Note:</b> You can also use{" "}
                  <Link href="/#products">
                    <a target="_blank" rel="noreferrer">
                      sell your files using products
                    </a>
                  </Link>
                  , without necessarily creating a collectible.
                </p>
                <p>
                  <b>Note:</b> In the future collectibles will appear in a
                  separate section of the website, but have some limitations
                  with respect to normal slicers.
                </p>
              </>
            }
          />
        </div>
        <div>
          <MySwitch enabled={isCollectible} setEnabled={setIsCollectible} />
        </div>
      </div>
    </div>
  )
}

export default SliceFormBlockSplitter
