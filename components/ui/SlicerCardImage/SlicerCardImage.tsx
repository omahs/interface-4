import Link from "next/link"
import { SlicerImage } from "@components/ui"
import CopyAddress from "../CopyAddress"
import UserVerified from "@components/icons/UserVerified"

type Props = {
  name: string
  imageUrl: string
  slicerAddress: string
  isAllowed: boolean
  href: string
}

const SlicerCardImage = ({
  name,
  imageUrl,
  slicerAddress,
  isAllowed,
  href,
}: Props) => {
  return (
    <div className="relative w-full overflow-hidden nightwind-prevent-block rounded-xl sm:w-80 h-60 sm:h-52 ">
      <Link href={href}>
        <a>
          <SlicerImage name={name} imageUrl={imageUrl} />
        </a>
      </Link>
      <span className="rounded-md absolute bottom-[10px] left-[12px] w-[150px] h-[32px] bg-white flex items-center">
        <div className="flex justify-center w-full text-black">
          <CopyAddress
            slicerAddress={slicerAddress}
            showIcon={false}
            position="bottom-[40px]"
          />
        </div>
      </span>
      {isAllowed && (
        <span className="rounded-md absolute bottom-[10px] right-[12px] bg-white">
          <UserVerified className="py-[6px] text-green-500 w-[46px] h-[32px]" />
        </span>
      )}
    </div>
  )
}

export default SlicerCardImage
