import Link from "next/link"
import { useRouter } from "next/router"
// import { signIn, useSession } from "next-auth/client"
import Logo from "@components/icons/Logo"
import Nightwind from "@components/icons/Nightwind"
import { Button, Container } from "@components/ui"
import { ethers } from "ethers"

const Navbar = () => {
  // const [session, loading] = useSession()
  // const router = useRouter()

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" })
  }

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
          <div className="flex items-center space-x-6">
            <Nightwind size="h-[26px]" />
            <div>
              <Button label="Connect" onClick={() => requestAccount()} />
            </div>
          </div>
        </nav>
      </Container>
      <hr className="w-full border-gray-200" />
    </header>
  )
}

export default Navbar
