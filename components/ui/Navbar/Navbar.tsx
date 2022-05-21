import dynamic from "next/dynamic"
import Link from "next/link"
import Logo from "@components/icons/Logo"
import Nightwind from "@components/icons/Nightwind"
import { Button, Container } from "@components/ui"
import UserIcon from "@components/icons/UserIcon"
import { useAppContext } from "@components/ui/context"
import { useState } from "react"

const DropdownMenu = dynamic(() => import("@components/ui/DropdownMenu"), {
  ssr: false
})

const Navbar = () => {
  const { isConnected, loading, setModalView } = useAppContext()
  const [showDropdown, setShowDropdown] = useState(false)

  const test = () => {
    // @ts-ignore
    sa_event("TEST")
  }

  return (
    <header className="shadow-sm bg-gray-50">
      <Container>
        <nav className="relative px-3 sm:px-6 h-[4.25rem] items-center mx-auto flex justify-between">
          <div className="relative z-10 flex items-center space-x-7 sm:space-x-10">
            <Link href="/">
              <a className="mb-1" aria-label="Slice logo">
                <Logo size="w-[24px]" />
              </a>
            </Link>
            <Link href="/slicer">
              <a>
                <p className="text-[0.925rem] font-normal">Explore</p>
              </a>
            </Link>
          </div>
          {process.env.NEXT_PUBLIC_CHAIN_ID === "4" && (
            <div className="absolute right-0 flex items-center justify-center w-full h-full">
              <p
                className={`px-32 text-xs font-bold text-center text-yellow-600 ${
                  !isConnected ? "hidden sm:block" : ""
                }`}
              >
                RINKEBY TESTNET
              </p>
            </div>
          )}
          <div className="relative z-10 flex items-center space-x-5 sm:space-x-8">
            <Nightwind size="h-[24px]" onClick={() => test()} />
            {!isConnected ? (
              <Button
                className="h-[36px] font-medium rounded-full border-2 shadow-light"
                color="border-sky-700 bg-white text-black hover:bg-sky-100"
                double={false}
                label="Connect"
                loading={loading}
                onClick={() =>
                  setModalView({ name: "CONNECT_VIEW", cross: true })
                }
              />
            ) : (
              <>
                {/* <SlcCounter /> */}
                <a
                  onClick={() =>
                    setShowDropdown((showDropdown) => !showDropdown)
                  }
                >
                  <UserIcon />
                </a>
              </>
            )}
          </div>
          {showDropdown && (
            <DropdownMenu
              showDropdown={showDropdown}
              setShowDropdown={setShowDropdown}
            />
          )}
        </nav>
      </Container>
      <hr className="w-full border-gray-200 opacity-80" />
    </header>
  )
}

export default Navbar
