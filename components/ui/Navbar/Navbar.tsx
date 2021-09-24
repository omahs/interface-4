import Link from "next/link"
import Logo from "@components/icons/Logo"
import Nightwind from "@components/icons/Nightwind"
import { Button, Container, SlcCounter } from "@components/ui"
import UserIcon from "@components/icons/UserIcon"
import { useAppContext } from "@components/ui/context"
import Metamask from "@components/icons/Metamask"
import handleConnect from "@lib/handleConnect"

const Navbar = () => {
  const { isConnected, loading } = useAppContext()

  return (
    <header className="shadow-sm bg-gray-50">
      <Container>
        <nav className="px-3 sm:px-6 h-[4.25rem] items-center mx-auto flex justify-between">
          <div className="flex items-center space-x-7 sm:space-x-10">
            <Link href="/">
              <a className="mb-1">
                <Logo size="w-[24px]" />
              </a>
            </Link>
            <Link href="/slicer">
              <a>
                <p className="text-[0.925rem] font-normal">Explore</p>
              </a>
            </Link>
          </div>
          <div className="flex items-center space-x-5 sm:space-x-8">
            <Nightwind size="h-[24px]" />
            {!isConnected ? (
              <Button
                className="h-[36px] font-medium rounded-full border-2 shadow-light"
                color="border-sky-700 bg-white text-black hover:bg-sky-100"
                double={false}
                label="Connect"
                loading={loading}
                onClick={() => handleConnect()}
              />
            ) : (
              <>
                <SlcCounter />
                <Link href="/profile">
                  <a>
                    <UserIcon />
                  </a>
                </Link>
              </>
            )}
          </div>
        </nav>
      </Container>
      <hr className="w-full border-gray-200 opacity-80" />
    </header>
  )
}

export default Navbar
