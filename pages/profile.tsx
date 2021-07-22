import { Button, ConnectBlock, DoubleText, SlicersList } from "@components/ui"

export default function Profile() {
  return (
    <ConnectBlock>
      <main className="max-w-screen-sm">
        <DoubleText
          inactive
          logoText={`Profile`}
          size="text-3xl sm:text-5xl"
          position="pb-8"
        />
        <div className="space-y-4 text-left">
          <SlicersList />
        </div>
      </main>
    </ConnectBlock>
  )
}
