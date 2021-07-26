import Link from "next/link"
import { Button, DoubleText } from "@components/ui"

export default function Home() {
  return (
    <main className="max-w-screen-lg mx-auto text-left">
      <DoubleText
        inactive
        logoText={`Slice`}
        size="text-6xl sm:text-7xl"
        position="pb-8"
      />
      <h2 className="pb-1 font-extrabold leading-normal">
        Decentralised payments
      </h2>
      <h3 className="font-normal">for real world applications and services</h3>
      <div className="flex flex-row items-center justify-start py-8 space-x-12 space-y-0 sm:py-10">
        <Button label="Start slicing" href="/slice" />
        <Link href="/slicer">
          <a>See Slicers</a>
        </Link>
      </div>
    </main>
  )
}
