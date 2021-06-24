import Link from "next/link"
import { useRouter } from "next/router"
// import { signIn, useSession } from "next-auth/client"
import Logo from "@components/icons/Logo"
import Nightwind from "@components/icons/Nightwind"
import { Container } from "@components/ui"

const Navbar = () => {
  // const [session, loading] = useSession()
  // const router = useRouter()

  return (
    <header className="bg-gray-50 shadow-sm">
      <Container>
        <nav className="px-6 py-5 items-center mx-auto flex justify-between">
          <div className="flex items-center">
            <Link href="/">
              <a>
                <Logo className="h-7 mr-10" />
              </a>
            </Link>
          </div>
          <div className="flex items-center">
            <Nightwind size="h-7" />
          </div>
        </nav>
      </Container>
      <hr className="w-full border-gray-200" />
    </header>
  )
}

export default Navbar
