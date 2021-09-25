import ActionScreen from "../ActionScreen"
import Button from "../Button"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import Spinner from "@components/icons/Spinner"

type Props = {
  children: JSX.Element
  elementsArray: any[]
  setIterator: Dispatch<SetStateAction<number>>
  actionScreenText: string
  actionScreenHref: string
  actionScreenButtonLabel: string
  endpageButtonLabel?: string
  endpageHref?: string
}

const ListLayout = ({
  elementsArray,
  setIterator,
  actionScreenText,
  actionScreenHref,
  actionScreenButtonLabel,
  endpageButtonLabel = actionScreenButtonLabel,
  endpageHref = actionScreenHref,
  children,
}: Props) => {
  const initItems = 4
  const [items, setItems] = useState(initItems)

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", () => {
        setItems(initItems)
        setIterator(items < elementsArray.length ? items : elementsArray.length)
      })
    }
  }, [])

  useEffect(() => {
    if (elementsArray) {
      setIterator(items < elementsArray.length ? items : elementsArray.length)
    }
  }, [elementsArray, items])

  return !elementsArray ? (
    <div className="flex justify-center pb-20">
      <Spinner size="w-10 h-10" />
    </div>
  ) : elementsArray.length != 0 ? (
    <>
      {children}
      <div className="pt-10 pb-6 space-y-8">
        {items < elementsArray.length && (
          <p className="text-center">
            <a
              className="underline"
              onClick={() => setItems(items + initItems)}
            >
              Load more
            </a>
          </p>
        )}
        <div className="flex justify-center">
          <Button label={endpageButtonLabel} href={endpageHref} />
        </div>
      </div>
    </>
  ) : (
    <ActionScreen
      text={actionScreenText}
      buttonLabel={actionScreenButtonLabel}
      href={actionScreenHref}
    />
  )
}

export default ListLayout
