import { useTheme } from "next-themes"
import nightwind from "nightwind/helper"
import Logo from "@components/icons/Logo"
import Nightwind from "@components/icons/Nightwind"
import ShoppingBag from "@components/icons/ShoppingBag"
import WalletConnect from "@walletconnect/client"
import { Dispatch, SetStateAction } from "react"
import { DropdownMenuElement } from ".."
import { useAppContext } from "../context"
type Props = {
  showDropdown: boolean
  setShowDropdown: Dispatch<SetStateAction<boolean>>
}

function DropdownMenu({ showDropdown, setShowDropdown }: Props) {
  const { connector }: { connector: WalletConnect } = useAppContext()

  const { theme, setTheme } = useTheme()

  const toggle = () => {
    nightwind.beforeTransition()
    if (theme !== "dark") {
      setTheme("dark")
    } else {
      setTheme("light")
    }
  }
  const disconnect = async () => {
    if (connector.connected) {
      await connector.killSession()
      setShowDropdown(false)
    } else {
      // TODO: Add metamask disconnect flow
      setShowDropdown(false)
    }
  }

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
          <Logo
            size="w-5"
            margin="mt-[4px] ml-[5px]"
            interactive={false}
            single={true}
          />
        }
        label="Your slicers"
        onClick={() => setShowDropdown(false)}
      />
      <DropdownMenuElement
        href="/purchases"
        image={<ShoppingBag className="w-5 h-5 text-blue-300" />}
        label="Purchases"
        onClick={() => setShowDropdown(false)}
      />
      <div className="xs:hidden">
        <DropdownMenuElement
          image={<Nightwind size="h-5" onClick={null} />}
          label="Toggle dark mode"
          onClick={async () => await toggle()}
        />
      </div>
    </div>
  )
}

export default DropdownMenu
