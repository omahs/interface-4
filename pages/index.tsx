import { Button, DoubleText } from "@components/ui"

export default function Home() {
  return (
    <main>
      <DoubleText
        inactive
        logoText={`Slice`}
        size="text-7xl sm:text-[5rem]"
        position="pb-8"
      />
      <h2>Unlocking NFTs full potential</h2>
      <div className="py-10 pb-8">
        <Button label="Start slicing" href="/slice" requireConnection />
      </div>
      <p>or keep scrolling to learn more</p>
    </main>
  )
}
