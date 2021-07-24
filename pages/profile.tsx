import { ConnectBlock, DoubleText, SlicersList } from "@components/ui"

export default function Profile() {
  return (
    <ConnectBlock>
      <main className="max-w-[420px] mx-auto sm:max-w-screen-md">
        <DoubleText
          inactive
          logoText="Your slicers"
          size="text-4xl sm:text-5xl"
          position="pb-12"
        />
        <div className="space-y-4 text-left">
          <SlicersList />
        </div>
      </main>
    </ConnectBlock>
  )
}
