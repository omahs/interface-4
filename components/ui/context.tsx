import useProvider from "@lib/useProvider"
import { createContext, useContext, useEffect, useState } from "react"
import { colorList, darkColorList } from "@utils/colorList"
import { View } from "@lib/text/modals"

const AppContext = createContext<any>({
  isConnected: false,
  chainId: "",
  account: "",
  loading: true,
  color1: colorList[0],
  color2: colorList[1],
  darkColor1: darkColorList[0],
  darkColor2: darkColorList[1],
  modalView: { name: "" },
  setModalView: () => null,
  shuffleColors: () => null,
})

export function AppWrapper({ children }) {
  const [loading, setLoading] = useState(true)
  const [modalView, setModalView] = useState<View>({ name: "" })
  const { isConnected, chainId, account } = useProvider(setLoading)

  const [color1, setColor1] = useState([])
  const [color2, setColor2] = useState([])
  const [darkColor1, setDarkColor1] = useState([])
  const [darkColor2, setDarkColor2] = useState([])

  const shuffleColors = () => {
    const random1 = Math.floor(Math.random() * colorList.length)
    const random2 = Math.floor(Math.random() * colorList.length)
    setColor1(colorList[random1])
    setColor2(colorList[random2])
    setDarkColor1(darkColorList[random1])
    setDarkColor2(darkColorList[random2])

    let root = document.documentElement
    root.style.setProperty("--color1", colorList[random1][0])
    root.style.setProperty("--color2", colorList[random2][0])
    root.style.setProperty("--darkColor1", darkColorList[random1][0])
    root.style.setProperty("--darkColor2", darkColorList[random2][0])
  }

  useEffect(() => {
    shuffleColors()
  }, [])

  return (
    <AppContext.Provider
      value={{
        isConnected,
        chainId,
        account,
        loading,
        color1,
        color2,
        darkColor1,
        darkColor2,
        modalView,
        setModalView,
        shuffleColors,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}
