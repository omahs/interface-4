import dynamic from "next/dynamic"
import Link from "next/link"
import Logo from "@components/icons/Logo"
import Nightwind from "@components/icons/Nightwind"
import { Container } from "@components/ui"
import { useAppContext } from "@components/ui/context"
import { useEffect, useRef, useState } from "react"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import UserIcon from "@components/icons/UserIcon"
import saEvent from "@utils/saEvent"

const DropdownMenu = dynamic(() => import("@components/ui/DropdownMenu"), {
  ssr: false
})

const Navbar = () => {
  const { isConnected } = useAppContext()
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    function handleClick(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClick)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClick)
    }
  }, [dropdownRef])

  return (
    <header className="shadow-sm">
      <Container>
        <nav className="relative px-3 sm:px-6 h-[4.25rem] items-center mx-auto flex justify-between">
          <div className="z-10 flex items-center space-x-6 sm:space-x-8">
            <Link href="/" aria-label="Slice logo">
              <Logo className="w-6 h-6" />
            </Link>
            <Link href="/slicer">
              <p className="text-[0.925rem] font-medium">Explore</p>
            </Link>
          </div>
          <div className="relative z-10 flex items-center space-x-6">
            <div>
              <Nightwind size="h-[24px]" />
            </div>
            <div onClick={() => saEvent("connect_wallet_attempt")}>
              <ConnectButton
                accountStatus={{
                  smallScreen: "avatar",
                  largeScreen: "full"
                }}
                chainStatus={{
                  smallScreen: "none",
                  largeScreen: "full"
                }}
              />
            </div>
            {isConnected && (
              <a
                onClick={() => setShowDropdown((showDropdown) => !showDropdown)}
                ref={dropdownRef}
              >
                <UserIcon />
              </a>
            )}
          </div>
          {showDropdown && (
            <div className="absolute top-0 right-0" ref={dropdownRef}>
              <DropdownMenu setShowDropdown={setShowDropdown} />
            </div>
          )}
        </nav>
      </Container>
      <hr className="w-full border-gray-200" />
    </header>
  )
}

export default Navbar
