import { Navbar, Footer } from "@components/ui"

export default function Layout({ children }) {
  return (
    <>
      <div className="relative flex flex-col justify-between min-h-screen">
        <Navbar />
        {children}
        <Footer />
      </div>
    </>
  )
}
