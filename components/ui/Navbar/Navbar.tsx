import { useEffect, useState } from "react"
import Link from "next/link"
import { ethers } from "ethers"
import Logo from "@components/icons/Logo"
import Nightwind from "@components/icons/Nightwind"
import { Button, Container } from "@components/ui"
import UserIcon from "@components/icons/UserIcon"
import useProvider from "@lib/useProvider"

const Navbar = () => {
  const [loading, setLoading] = useState(true)
  const isConnected = useProvider(setLoading)

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" })
  }

  // Todo: trigger useProvider on connect/disconnect

  return (
    <header className="bg-gray-50 shadow-sm">
      <Container>
        <nav className="px-6 h-[4.25rem] items-center mx-auto flex justify-between">
          <div className="flex mb-1 items-center">
            <Link href="/">
              <a>
                <Logo size="w-[24px]" />
              </a>
            </Link>
          </div>
          <div className="flex items-center space-x-8">
            <Nightwind size="h-[26px]" />
            <div>
              {!isConnected ? (
                <Button
                  className="rounded-full border-2 font-medium"
                  color=" border-blue-700 bg-white text-black hover:bg-blue-100"
                  label="Connect"
                  loading={loading}
                  onClick={() => requestAccount()}
                />
              ) : (
                <Link href="/profile">
                  <a>
                    <UserIcon />
                  </a>
                </Link>
              )}
            </div>
          </div>
        </nav>
      </Container>
      <hr className="w-full border-gray-200" />
    </header>
  )
}

export default Navbar
