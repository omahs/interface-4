import { Button, DoubleText } from "@components/ui"
import { useAppContext } from "@components/ui/context"

export type View = {
  name: ViewNames
  cross?: boolean
  params?: object
}
type ViewNames =
  | ""
  | "CONNECT_VIEW"
  | "IRREVERSIBLE_VIEW"
  | "CREATE_PRODUCT_VIEW"
  | "CREATE_PRODUCT_CONFIRM_VIEW"

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

export const CREATE_PRODUCT_CONFIRM_VIEW = (params: any) => {
  const { submitEl, uploadStep, setModalView } = params
  const handleClick = () => {
    submitEl.current.click()
    if (uploadStep == 0) {
      setModalView("")
    }
  }
  return (
    <>
      <div className="pb-6 text-center">
        <DoubleText logoText="Gnaaa" />
      </div>
      <Button label="Create product" onClick={() => handleClick()} />
    </>
  )
}

export const CREATE_PRODUCT_VIEW = (params: any) => {
  const { loading, uploadStep } = params
  let uploadState: string

  switch (uploadStep) {
    case 1:
    case 2:
    case 3:
      uploadState = "Getting ready"
      break
    case 4:
    case 5:
      uploadState = "Uploading files"
      break
    case 6:
      uploadState = "Waiting from blockchain"
      break
    case 7:
      uploadState = "Reverting"
      break
    case 8:
      uploadState = "Done, reverted"
      break
    case 9:
      uploadState = "Done, success"
      break
  }
  return (
    <>
      <div className="pb-6 text-center">
        <DoubleText logoText={uploadState} />
      </div>
      <p className="text-lg text-center">Some text</p>
    </>
  )
}
