import useProvider from "@lib/useProvider"
import { createContext, useContext, useEffect, useState } from "react"
import colorList from "@utils/colorList"

const AppContext = createContext({
  isConnected: false,
  account: "",
  loading: true,
  color1: colorList[0],
  color2: colorList[1],
  // darkColor1: darkColorList[0],
  // darkColor2: darkColorList[1],
})

export function AppWrapper({ children }) {
  const [loading, setLoading] = useState(true)
  const { isConnected, account } = useProvider(setLoading)

  const [color1, setColor1] = useState([])
  const [color2, setColor2] = useState([])

  useEffect(() => {
    setColor1(colorList[Math.floor(Math.random() * colorList.length)])
    setColor2(colorList[Math.floor(Math.random() * colorList.length)])
  }, [])
  // const darkColor1 =
  //   darkColorList[Math.floor(Math.random() * darkColorList.length)]
  // const darkColor2 =
  //   darkColorList[Math.floor(Math.random() * darkColorList.length)]

  return (
    <AppContext.Provider
      value={{ isConnected, account, loading, color1, color2 }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}
