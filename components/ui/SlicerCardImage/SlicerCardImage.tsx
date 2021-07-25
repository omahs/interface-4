import Link from "next/link"
import { SlicerImage } from "@components/ui"
import CopyAddress from "../CopyAddress"
import UserVerified from "@components/icons/UserVerified"
// import { useAppContext } from "../context"

type Props = {
  name: string
  imageUrl: string
  href: string
  slicerAddress?: string
  isAllowed?: boolean
  size?: string
}

const SlicerCardImage = ({
  name,
  imageUrl,
  href,
  slicerAddress = "",
  isAllowed = false,
  size = "sm:w-80 h-60 sm:h-52",
}: Props) => {
  // const { color1, color2 } = useAppContext()
  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl nightwind-prevent-block img-background ${size}`}
    >
      <Link href={href}>
        <a className="peer">
          <SlicerImage name={name} imageUrl={imageUrl} />
        </a>
      </Link>
      {slicerAddress && (
        <span className="rounded-md absolute bottom-[10px] left-[12px] w-[150px] h-[32px] bg-white flex items-center">
          <div className="flex justify-center w-full text-black">
            <CopyAddress
              slicerAddress={slicerAddress}
              showIcon={false}
              position="bottom-[40px]"
            />
          </div>
        </span>
      )}
      {isAllowed && (
        <span className="rounded-md absolute bottom-[10px] right-[12px] bg-white">
          <UserVerified className="py-[6px] text-green-500 w-[46px] h-[32px]" />
        </span>
      )}
      {/* <div
        className={`rounded-xl overflow-hidden shadow-light-random absolute top-0 mt-[0.6rem] ml-[0.6rem] mr-[-0.6rem] bg-gradient-to-br ${color1[3]} ${color2[4]} text-transparent peer-hover:mt-0 peer-hover:ml-0 peer-hover:mr-0 peer-focus:mt-0 peer-focus:ml-0 peer-focus:mr-0 transition-all duration-150 ${size}`}
      ></div> */}
    </div>
  )
}

export default SlicerCardImage
