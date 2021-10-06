import dynamic from "next/dynamic"
import { Footer, Navbar } from "@components/ui"
import { useAppContext } from "@components/ui/context"
import { useEffect } from "react"
import { useCookies } from "react-cookie"
import { ProductCart } from "@lib/handleUpdateCart"
import { FloatingCart } from "@components/ui"
// import ProductHuntBadge from "../ProductHuntBadge"

export default function Layout({ children }) {
  // const FloatingCart = dynamic(() => import("@components/ui/FloatingCart"), {
  //   ssr: false,
  // })
  const Modal = dynamic(() => import("@components/ui/Modal"), {
    ssr: false,
  })

  const { isConnected, chainId, modalView, setModalView } = useAppContext()
  const [cookies] = useCookies(["cart"])

  const cookieCart: ProductCart[] = cookies?.cart

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") {
      if (isConnected && chainId && Number(chainId).toString(16) !== "4") {
        setModalView({ cross: false, name: "NETWORK_VIEW" })
      } else {
        setModalView({ name: "" })
      }
    }
  }, [isConnected, chainId])

  return (
    <>
      <div className="relative flex flex-col justify-between min-h-screen">
        <Navbar />
        {children}
        <Footer />
        {modalView.name && (
          <Modal modalView={modalView} setModalView={setModalView} />
        )}
        <FloatingCart cookieCart={cookieCart} />
        {/* <ProductHuntBadge /> */}
      </div>
    </>
  )
}
