import { Button, DoubleText } from "@components/ui"

export default function Home() {
  return (
    <main className="max-w-screen-sm mx-auto">
      <DoubleText
        inactive
        logoText={`Slice`}
        size="text-7xl sm:text-[5rem]"
        position="pb-8"
      />
      <h2 className="leading-normal">
        Decentralised payments for real world applications and services
      </h2>
      <div className="py-10">
        <Button label="Start slicing" href="/slice" />
      </div>
      <p>or keep scrolling to learn more</p>
    </main>
  )
}
