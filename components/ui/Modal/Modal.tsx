import Cross from "@components/icons/Cross"
import { Dispatch, SetStateAction, useEffect, useRef } from "react"
import {
  View,
  LOADING_VIEW,
  NETWORK_VIEW,
  CONNECT_VIEW,
  IRREVERSIBLE_VIEW,
  REDEEM_INSTRUCTIONS_VIEW,
  OWNERS_VIEW,
  CREATE_PRODUCT_VIEW,
  CREATE_PRODUCT_CONFIRM_VIEW,
  PRODUCT_VIEW,
  REDEEM_PRODUCT_VIEW,
  FINGERPRINTING_VIEW
} from "@lib/content/modals"

type Props = {
  modalView: View
  setModalView: Dispatch<SetStateAction<View>>
}

const Modal = ({ modalView, setModalView }: Props) => {
  const { name, cross, params } = modalView
  const modalRef = useRef(null)

  const content = () => {
    switch (name) {
      case "LOADING_VIEW":
        return LOADING_VIEW()
      case "NETWORK_VIEW":
        return NETWORK_VIEW()
      case "CONNECT_VIEW":
        return CONNECT_VIEW()
      case "IRREVERSIBLE_VIEW":
        return IRREVERSIBLE_VIEW()
      case "REDEEM_INSTRUCTIONS_VIEW":
        return REDEEM_INSTRUCTIONS_VIEW()
      case "OWNERS_VIEW":
        return OWNERS_VIEW(params)
      case "CREATE_PRODUCT_CONFIRM_VIEW":
        return CREATE_PRODUCT_CONFIRM_VIEW(params)
      case "CREATE_PRODUCT_VIEW":
        return CREATE_PRODUCT_VIEW(params)
      case "PRODUCT_VIEW":
        return PRODUCT_VIEW(params)
      case "REDEEM_PRODUCT_VIEW":
        return REDEEM_PRODUCT_VIEW(params)
      case "FINGERPRINTING_VIEW":
        return FINGERPRINTING_VIEW()
    }
  }

  useEffect(() => {
    if (cross) {
      function handleClick(event) {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
          setModalView({ name: "" })
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClick)
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClick)
      }
    }
  }, [modalRef, cross])

  return (
    <div
      className={`fixed top-0 w-screen h-screen py-12 overflow-y-scroll xs:py-20 background-modal ${
        name === "NETWORK_VIEW" ? "z-100" : "z-50"
      }`}
    >
      <div className="absolute w-full h-full mt-[-3rem] xs:mt-[-5rem]" />
      <div
        className="flex items-center justify-center"
        style={{ minHeight: "100%" }}
      >
        <div
          className="relative w-full px-4 py-16 mx-4 bg-white shadow-xl xs:py-20 xs:px-8 rounded-xl max-w-screen-xs"
          ref={modalRef}
        >
          {cross && (
            <div className="absolute top-[24px] right-[24px]">
              <Cross
                className="text-right cursor-pointer hover:text-red-500"
                onClick={() => setModalView({ name: "" })}
              />
            </div>
          )}
          <div>{content()}</div>
        </div>
      </div>
    </div>
  )
}

export default Modal
