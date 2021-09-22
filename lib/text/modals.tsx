import { Button, DoubleText, LoadingStep } from "@components/ui"
import { useAppContext } from "@components/ui/context"
import { useRouter } from "next/dist/client/router"

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
      <DoubleText inactive logoText="Pick the right chain" />
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
        <DoubleText inactive logoText="Be careful" />
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
        <Button label="Continue" onClick={() => setModalView({ name: "" })} />
      </div>
    </>
  )
}

export const CREATE_PRODUCT_CONFIRM_VIEW = (params: any) => {
  const { submitEl, uploadStep, setModalView } = params
  const handleClick = () => {
    submitEl.current.click()
    if (uploadStep == 0) {
      setModalView({ name: "" })
    }
  }
  return (
    <>
      <div className="pb-6 text-center">
        <DoubleText inactive logoText="Ready to mint?" />
        <p className="pt-8">
          Make sure the information you added is correct, you won&apos;t be able
          to change all details later.
        </p>
      </div>

      <div className="text-center">
        <Button label="Go ahead!" onClick={() => handleClick()} />
      </div>
      <div className="flex justify-center pt-8">
        <p
          className="font-medium text-red-500 cursor-pointer hover:underline"
          onClick={() => setModalView({ name: "" })}
        >
          Go back
        </p>
      </div>
    </>
  )
}

export const CREATE_PRODUCT_VIEW = (params: any) => {
  const router = useRouter()
  const { slicerId, uploadStep, uploadPct, setModalView } = params
  const processing = uploadStep !== 8 && uploadStep !== 10
  const toSlicer = () => {
    setModalView({ name: "" })
    router.push(`/slicer/${slicerId}`)
  }

  let uploadState: string
  switch (uploadStep) {
    case 1:
      uploadState = "Uploading image"
      break
    case 2:
      uploadState = "Saving metadata"
      break
    case 3:
      uploadState = "Encrypting files"
      break
    case 4:
      uploadState = `Uploading files: ${uploadPct < 100 ? uploadPct : 100}%`
      break
    case 5:
      uploadState = "Finishing setting up"
      break
    case 6:
      uploadState = "Waiting from blockchain"
      break
    case 7:
      uploadState = "Reverting"
      break
    case 8:
      uploadState = "Done, reverted!"
      break
    case 9:
      uploadState = "Finalizing"
      break
    case 10:
      uploadState = "Done, success!"
      break
  }
  return (
    <div className="text-center">
      <div className="pb-6 text-center">
        <DoubleText inactive logoText="Minting in progress" />
      </div>
      <p className="pb-8">Please wait until the process is completed</p>
      <div className="grid items-center grid-cols-6 gap-2 px-4">
        <LoadingStep
          initCondition={uploadStep < 3}
          uploadState={uploadState}
          endState="Done"
        />
        <LoadingStep
          nullCondition={uploadStep < 3}
          initCondition={uploadStep < 6}
          uploadState={uploadState}
          waitingState="File upload"
          endState="Done"
        />
        <LoadingStep
          nullCondition={uploadStep < 6}
          initCondition={processing}
          uploadState={uploadState}
          waitingState="Blockchain interaction"
        />
      </div>
      <p className="max-w-sm py-6 text-sm">
        To make the product immediately appear on the website{" "}
        <b>do not leave this page until the process has completed</b>
      </p>
      <Button
        label={uploadStep === 8 ? "Create a new product" : "Go to slicer"}
        loading={processing}
        onClick={() => (uploadStep === 8 ? router.reload() : toSlicer())}
      />
      {uploadStep === 10 && (
        <div className="flex justify-center pt-8">
          <p
            className="font-medium text-blue-600 cursor-pointer hover:underline"
            onClick={() => router.reload()}
          >
            Create a new product
          </p>
        </div>
      )}
    </div>
  )
}
