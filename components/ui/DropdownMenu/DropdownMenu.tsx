import Logo from "@components/icons/Logo"
import ShoppingBag from "@components/icons/ShoppingBag"
import { Dispatch, SetStateAction } from "react"
import { DropdownMenuElement } from ".."

type Props = {
  showDropdown: boolean
  setShowDropdown: Dispatch<SetStateAction<boolean>>
}

function DropdownMenu({ showDropdown, setShowDropdown }: Props) {
  return (
    <div
      className={`z-20 absolute top-0 right-0 w-56 p-1.5 mt-20 space-y-1 bg-white rounded-xl shadow-base transition-opacity duration-200 nightwind-prevent-block`}
      // ${
      //   showDropdown ? " opacity-100" : "-z-10 opacity-0"
      // }
    >
      <DropdownMenuElement
        href="/profile"
        image={
          <Logo size="w-5" margin="mt-[4px] ml-[5px]" interactive={false} />
        }
        label="Your slicers"
        onClick={() => setShowDropdown(false)}
      />
      <DropdownMenuElement
        href="/purchases"
        image={<ShoppingBag className="w-5 h-5" />}
        label="Purchases"
        onClick={() => setShowDropdown(false)}
      />
    </div>
  )
}

export default DropdownMenu
