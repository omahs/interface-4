import { useState } from "react"
import { Button, ConnectBlock, DoubleText, SliceForm } from "@components/ui"
import { useAppContext } from "@components/ui/context"

export default function Home() {
  const { isConnected } = useAppContext()

  return (
    <main className="py-12 text-center md:py-16">
      <DoubleText
        inactive
        logoText={`Create a Slicer`}
        size="text-4xl sm:text-6xl"
        position="block"
      />
      <h2>Just slice it</h2>
      {isConnected ? (
        <>
          <SliceForm />
        </>
      ) : (
        <ConnectBlock />
      )}
    </main>
  )
}
