import { useState } from "react"
import { Button, DoubleText } from "@components/ui"

export default function Home() {
  return (
    <main className="py-12 text-center md:py-16">
      <div className="relative pb-8">
        <DoubleText
          inactive
          logoText={`Slice`}
          size="text-7xl sm:text-[5rem]"
          position="block"
        />
      </div>
      <p className="text-3xl font-semibold leading-snug">
        Unlocking NFTs full potential
      </p>
      <div className="pt-6">
        <Button label="test is the way to gooo" requireConnection />
      </div>
    </main>
  )
}
