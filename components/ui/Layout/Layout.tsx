import { Navbar, Footer } from "@components/ui"

export interface Props {
  line?: boolean
}

export default function Layout({ line = false, children }) {
  return (
    <>
      <div className="relative min-h-screen flex flex-col justify-between">
        <Navbar line={line} />
        {children}
        <Footer />
      </div>
    </>
  )
}
