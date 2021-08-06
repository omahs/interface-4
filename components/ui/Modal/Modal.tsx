import Cross from "@components/icons/Cross"
import { Dispatch, SetStateAction } from "react"
import { View, CONNECT_VIEW } from "lib/text/modals"

type Props = {
  modalView: View
  setModalView: Dispatch<SetStateAction<View>>
}

const Modal = ({ modalView, setModalView }: Props) => {
  let content: JSX.Element
  const { name, cross } = modalView

  switch (name) {
    case "CONNECT_VIEW":
      content = CONNECT_VIEW
      break
  }

  return (
    <div className="fixed top-0 z-10 flex items-center justify-center w-screen h-screen backdrop-filter backdrop-blur-md">
      <div className="relative px-4 py-8 mx-4 bg-white xs:py-12 xs:px-8 rounded-xl max-w-screen-xs">
        {cross && (
          <div className="absolute top-[20px] right-[20px]">
            <Cross
              className="text-right cursor-pointer hover:text-blue-600"
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
