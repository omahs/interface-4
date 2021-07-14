import { Button, DoubleText } from "@components/ui"

export default function Profile() {
  return (
    <main className="max-w-screen-sm">
      <DoubleText
        inactive
        logoText={`Profile`}
        size="text-4xl sm:text-6xl"
        position="pb-8"
      />
      <div className="text-left">
        <h2 className="leading-normal">Slicers</h2>
      </div>
      <div className="py-10">
        <Button label="Start slicing" href="/slice" />
      </div>
    </main>
  )
}
