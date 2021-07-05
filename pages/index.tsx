import { useState } from "react"
import { Button, DoubleText } from "@components/ui"

export default function Home() {
  return (
    <main className="py-12 md:py-16 text-center">
      <div className="pb-8 relative">
        <DoubleText
          inactive
          logoText={`Slice`}
          size="text-7xl sm:text-[5rem]"
          position="block"
        />
      </div>
      <p className="font-semibold leading-snug text-3xl">
        Unlocking the true power of NFTs
      </p>
    </main>
  )
}
