import Link from "next/link"
import { useState } from "react"
import { formatEther } from "ethers/lib/utils"
import formatNumber from "@utils/formatNumber"
import Arrow from "@components/icons/Arrow"
import { ReleaseCard, CardImage, CopyAddress } from ".."
import UserVerified from "@components/icons/UserVerified"
import Immutable from "@components/icons/Immutable"
import ProductsBalance from "../ProductsBalance"
import { NewTransaction } from "@rainbow-me/rainbowkit/dist/transactions/transactionStore"
import { SlicerReduced } from "pages/slicer"
import { UnreleasedAmount } from "../SlicersList/SlicersList"
import QuestionMark from "@components/icons/QuestionMark"
import { useAppContext } from "../context"

type Props = {
  slicerId: number
  slicerAddress: string
  shares: number
  totalSlices: number
  protocolFee: number
  isAllowed: boolean
  isImmutable: boolean
  productsModuleBalance: string
  addRecentTransaction: (transaction: NewTransaction) => void
  unreleasedAmounts: UnreleasedAmount[]
  dbData: SlicerReduced
}

const SlicerCard = ({
  slicerId,
  slicerAddress,
  shares,
  totalSlices,
  protocolFee,
  isAllowed,
  isImmutable,
  productsModuleBalance,
  addRecentTransaction,
  unreleasedAmounts,
  dbData
}: Props) => {
  const { setModalView } = useAppContext()
  const { name, image } = dbData || {}
  const [updatedUnreleasedAmounts, setUpdatedUnreleasedAmounts] =
    useState<UnreleasedAmount[]>()
  const slicerLink = `/slicer/${slicerId}`
  const slicerName = name || `Slicer #${slicerId}`
  const slicePercentage = Math.floor((shares / totalSlices) * 10000) / 100
  const currencyShown = 1

  const unreleasedData = updatedUnreleasedAmounts || unreleasedAmounts
  const unreleasedFormatted = unreleasedData
    ?.filter((el) => Number(el.amount) != 0)
    .sort(
      (a, b) =>
        Number(formatEther(b.amount)) * (b.quote || 0) -
        Number(formatEther(a.amount)) * (a.quote || 0)
    )

  return (
    <div className="sm:flex">
      <CardImage
        href={slicerLink}
        name={slicerName}
        topLeft={
          isImmutable && {
            title: "Immutable asset",
            content: (
              <Immutable className="py-2 text-indigo-600 w-[38px] h-[38px]" />
            ),
            padding: "px-4"
          }
        }
        topRight={
          isAllowed && {
            title: "Superowner",
            content: (
              <UserVerified className="text-green-500 py-2 w-[38px] h-[38px]" />
            ),
            padding: "px-4"
          }
        }
        bottomLeft={{
          className: "text-black",
          content: slicerAddress ? (
            <CopyAddress
              slicerAddress={slicerAddress}
              showIcon={false}
              position="left-0 bottom-[40px]"
            />
          ) : (
            <div className="w-24 h-4 rounded-md bg-sky-300 animate-pulse" />
          ),
          clickable: false
        }}
        bottomRight={{
          title: "Total slices",
          content: `${formatNumber(totalSlices)} 🍰`,
          className: "text-black text-sm font-medium"
        }}
        imageUrl={image}
      />
      <div className="flex-grow pt-4 sm:pt-1 sm:ml-6 md:ml-14">
        <div>
          <Link href={slicerLink}>
            <a className="flex items-center">
              {dbData ? (
                <h3 className="inline-block">{slicerName}</h3>
              ) : (
                <div className="w-32 h-6 mb-2 rounded-md bg-sky-300 animate-pulse" />
              )}
              <p className="h-full ml-3 text-sm font-normal text-gray-500">
                #{slicerId}
              </p>
            </a>
          </Link>
          <div className="space-y-2 text-gray-700">
            <div className="flex items-center">
              <p className="text-sm">
                {formatNumber(shares, 3)} slices owned ({slicePercentage})%
              </p>
              <Link href={`/transfer?id=${slicerId}`}>
                <a className="flex items-center ml-3 group">
                  <p className="text-sm ">Transfer</p>
                  <div className="w-5 h-5 ml-1 transition-transform duration-150 group-hover:translate-x-1">
                    <Arrow />
                  </div>
                </a>
              </Link>
            </div>
          </div>
          <ProductsBalance
            slicerId={slicerId}
            productsModuleBalance={productsModuleBalance}
            unreleasedAmounts={unreleasedAmounts}
            setUpdatedUnreleasedAmounts={setUpdatedUnreleasedAmounts}
          />
        </div>
        {dbData && unreleasedFormatted.length != 0 && (
          <div className="mt-5">
            <div className="flex items-center gap-1 pb-1 text-sm text-gray-500">
              <p>Release | Withdraw</p> <QuestionMark className="w-4 h-4" />
            </div>
            <ul>
              {unreleasedFormatted
                .slice(0, currencyShown)
                .map((unreleasedAmount, i) => (
                  <li key={i}>
                    <ReleaseCard
                      slicerAddress={slicerAddress}
                      unreleasedAmount={unreleasedAmount}
                      addRecentTransaction={addRecentTransaction}
                    />
                    {i < currencyShown - 1 &&
                      i < unreleasedFormatted.length - 1 && (
                        <hr className="border-gray-200" />
                      )}
                  </li>
                ))}
            </ul>
            {unreleasedFormatted.length > currencyShown && (
              <p className="pt-2 text-sm text-right">
                <a
                  className="highlight"
                  onClick={() =>
                    setModalView({
                      cross: true,
                      name: "RELEASE_SLICER_CURRENCIES_VIEW",
                      params: { slicerAddress, unreleasedFormatted }
                    })
                  }
                >
                  See all
                </a>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default SlicerCard
