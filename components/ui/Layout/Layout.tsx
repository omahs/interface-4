import dynamic from "next/dynamic"
import { Footer, Navbar } from "@components/ui"
import { useAppContext } from "@components/ui/context"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { ProductCart } from "@lib/handleUpdateCart"

const ProductHuntBadge = dynamic(
  () => import("@components/ui/ProductHuntBadge")
)
const FloatingCart = dynamic(() => import("@components/ui/FloatingCart"), {
  ssr: false,
})
const Modal = dynamic(() => import("@components/ui/Modal"), {
  ssr: false,
})

export default function Layout({ children }) {
  const { isConnected, chainId, modalView, setModalView } = useAppContext()
  const [success, setSuccess] = useState(false)
  const [cookies] = useCookies(["cart"])

  const cookieCart: ProductCart[] = cookies?.cart

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") {
      if (
        isConnected &&
        chainId &&
        Number(chainId).toString(16) !== process.env.NEXT_PUBLIC_CHAIN_ID
      ) {
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
        {success || (cookieCart && cookieCart.length != 0) ? (
          <FloatingCart
            cookieCart={cookieCart}
            success={success}
            setSuccess={setSuccess}
          />
        ) : (
          // ) : null
          <ProductHuntBadge />
        )}
      </div>
    </>
  )
}
