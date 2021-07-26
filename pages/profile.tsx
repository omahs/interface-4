import {
  ConnectBlock,
  Container,
  DoubleText,
  SlicersList,
} from "@components/ui"

export default function Profile() {
  return (
    <Container page={true}>
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
    </Container>
  )
}
