import { Button, DoubleText } from "@components/ui"
import { useAppContext } from "@components/ui/context"

export type View = {
  name: ViewNames
  cross?: boolean
}
type ViewNames = "" | "CONNECT_VIEW" | "IRREVERSIBLE_VIEW"

export const CONNECT_VIEW = (
  <>
    <div className="pb-6 text-center">
      <DoubleText logoText="Pick the right chain" />
    </div>
    <p className="text-lg">
      Connect to the <span className="font-black">Rinkeby</span> Network to
      access Slice
    </p>
  </>
)

export const IRREVERSIBLE_VIEW = () => {
  const { setModalView } = useAppContext()
  return (
    <>
      <div className="pb-6 text-center">
        <DoubleText logoText="Be careful" />
      </div>
      <div className="text-lg text-center">
        <p className="pb-4">
          This action is irreversible, you cannot change the name, description
          and image of your slicer a second time.
        </p>
        <p className="font-semibold">
          Make sure the slicer details and image are correct
        </p>
      </div>
      <div className="flex justify-center pt-8">
        <Button label="Continue" onClick={() => setModalView("")} />
      </div>
    </>
  )
}
