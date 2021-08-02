import { DoubleText } from "@components/ui"

export type View = {
  name: ViewNames
  cross?: boolean
}
type ViewNames = "" | "CONNECT_VIEW"

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
