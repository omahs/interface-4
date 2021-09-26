import Logo from "@components/icons/Logo"
import ShoppingBag from "@components/icons/ShoppingBag"
import { Dispatch, SetStateAction } from "react"
import { DropwdownMenuElement } from ".."

type Props = {
  showDropdown: boolean
  setShowDropdown: Dispatch<SetStateAction<boolean>>
}

function DropwdownMenu({ showDropdown, setShowDropdown }: Props) {
  return (
    <div
      className={`absolute top-0 right-0 w-56 p-1.5 mt-20 space-y-1 bg-white rounded-xl shadow-base transition-opacity duration-200 nightwind-prevent-block ${
        showDropdown ? "z-20 opacity-100" : "-z-10 opacity-0"
      }`}
    >
      <DropwdownMenuElement
        href="/profile"
        image={
          <Logo size="w-5" margin="mt-[4px] ml-[5px]" interactive={false} />
        }
        label="Your slicers"
        onClick={() => setShowDropdown(false)}
      />
      <DropwdownMenuElement
        href="/purchases"
        image={<ShoppingBag className="w-5 h-5" />}
        label="Purchases"
        onClick={() => setShowDropdown(false)}
      />
    </div>
  )
}

export default DropwdownMenu
