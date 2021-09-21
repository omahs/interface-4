import Link from "next/link"
import { SlicerImage } from "@components/ui"
import CopyAddress from "../CopyAddress"
import UserVerified from "@components/icons/UserVerified"
import Collectible from "@components/icons/Collectible"
// import { useAppContext } from "../context"

type Props = {
  name: string
  imageUrl: string
  href?: string
  slicerAddress?: string
  totalSlices?: number | string
  isAllowed?: boolean
  isCollectible?: boolean
  size?: string
}

const SlicerCardImage = ({
  name,
  imageUrl,
  href,
  slicerAddress = "",
  totalSlices,
  isAllowed = false,
  isCollectible,
  size = "sm:w-80 h-60 sm:h-52",
}: Props) => {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl nightwind-prevent-block img-background ${size}`}
    >
      {href ? (
        <Link href={href}>
          <a>
            <SlicerImage name={name} imageUrl={imageUrl} />
          </a>
        </Link>
      ) : (
        <SlicerImage name={name} imageUrl={imageUrl} />
      )}
      {slicerAddress && (
        <span className="rounded-md absolute bottom-[10px] left-[12px] px-5 h-[32px] bg-white flex items-center">
          <div className="flex justify-center w-full text-black">
            {slicerAddress ? (
              <CopyAddress
                slicerAddress={slicerAddress}
                showIcon={false}
                position="bottom-[40px]"
              />
            ) : (
              <div className="w-24 h-4 rounded-md bg-sky-300 animate-pulse" />
            )}
          </div>
        </span>
      )}
      {isAllowed && (
        <span className="rounded-md absolute top-[10px] right-[12px] bg-white">
          <UserVerified className="py-[6px] text-green-500 w-[46px] h-[32px]" />
        </span>
      )}
      {totalSlices && (
        <span className="flex items-center rounded-md absolute bottom-[10px] right-[12px] h-[32px] bg-white text-black text-sm font-medium px-4">
          {totalSlices} 🍰
        </span>
      )}
      {isCollectible && (
        <span className="rounded-md absolute top-[10px] left-[12px] bg-white">
          <Collectible className="py-[6px] text-indigo-600 w-[46px] h-[32px]" />
        </span>
      )}
    </div>
  )
}

export default SlicerCardImage
