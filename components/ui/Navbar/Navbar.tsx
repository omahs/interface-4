import { useEffect, useState } from "react"
import Link from "next/link"
import Logo from "@components/icons/Logo"
import Nightwind from "@components/icons/Nightwind"
import { Button, Container } from "@components/ui"
import UserIcon from "@components/icons/UserIcon"
import { useAppContext } from "@components/ui/context"

const Navbar = () => {
  const { isConnected, loading } = useAppContext()

  const requestAccount = async () => {
    await window.ethereum.request({ method: "eth_requestAccounts" })
  }

  return (
    <header className="shadow-sm bg-gray-50">
      <Container>
        <nav className="px-6 h-[4.25rem] items-center mx-auto flex justify-between">
          <div className="flex items-center mb-1">
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
                  className="h-[36px] font-medium rounded-full border-2 shadow-light"
                  color=" border-sky-700 bg-white text-black hover:bg-sky-100"
                  double={false}
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
