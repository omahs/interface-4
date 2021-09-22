import Cross from "@components/icons/Cross"
import { Dispatch, SetStateAction } from "react"
import {
  View,
  CONNECT_VIEW,
  IRREVERSIBLE_VIEW,
  CREATE_PRODUCT_VIEW,
  CREATE_PRODUCT_CONFIRM_VIEW,
} from "lib/text/modals"

type Props = {
  modalView: View
  setModalView: Dispatch<SetStateAction<View>>
}

const Modal = ({ modalView, setModalView }: Props) => {
  let content: JSX.Element
  const { name, cross, params } = modalView

  switch (name) {
    case "CONNECT_VIEW":
      content = CONNECT_VIEW
      break
    case "IRREVERSIBLE_VIEW":
      content = IRREVERSIBLE_VIEW()
      break
    case "CREATE_PRODUCT_CONFIRM_VIEW":
      content = CREATE_PRODUCT_CONFIRM_VIEW(params)
      break
    case "CREATE_PRODUCT_VIEW":
      content = CREATE_PRODUCT_VIEW(params)
      break
  }

  return (
    <div className="fixed top-0 z-10 flex items-center justify-center w-screen h-screen background-modal">
      <div
        className="absolute w-full h-full"
        onClick={() => (cross ? setModalView({ name: "" }) : null)}
      />
      <div className="relative px-4 py-8 mx-4 bg-white shadow-xl xs:py-12 xs:px-8 rounded-xl max-w-screen-xs">
        {cross && (
          <div className="absolute top-[20px] right-[20px]">
            <Cross
              className="text-right cursor-pointer hover:text-red-500"
              onClick={() => setModalView({ name: "" })}
            />
          </div>
        )}
        <div>{content}</div>
      </div>
    </div>
  )
}

export default Modal
