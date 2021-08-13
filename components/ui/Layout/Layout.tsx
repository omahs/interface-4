import { Footer, Modal, Navbar } from "@components/ui"
import { useAppContext } from "@components/ui/context"
import { useEffect } from "react"
import ProductHuntBadge from "../ProductHuntBadge"

export default function Layout({ children }) {
  const { isConnected, chainId, modalView, setModalView } = useAppContext()

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") {
      if (isConnected && chainId && chainId !== "0x4") {
        setModalView({ cross: false, name: "CONNECT_VIEW" })
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
        <ProductHuntBadge />
      </div>
    </>
  )
}
