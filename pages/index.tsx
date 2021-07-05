import { useState } from "react"
import { Button, DoubleText } from "@components/ui"

export default function Home() {
  return (
    <main className="py-12 text-center md:py-16">
      <DoubleText
        inactive
        logoText={`Slice a token`}
        size="text-4xl sm:text-5xl"
        position="block"
      />
      <p className="text-3xl font-semibold leading-snug">
        Unlocking NFTs full potential
      </p>
      <div className="py-10 pb-8">
        <Button label="Start slicing" href="/slice" requireConnection />
      </div>
      <p>or keep scrolling to learn more</p>
    </main>
  )
}
