import useProvider from "@lib/useProvider"
import { createContext, useContext, useState } from "react"
import colorList from "@utils/colorList"

const AppContext = createContext({
  isConnected: false,
  loading: true,
  color1: colorList[0],
  color2: colorList[1],
})

export function AppWrapper({ children }) {
  const [loading, setLoading] = useState(true)
  const isConnected = useProvider(setLoading)

  const color1 = colorList[Math.floor(Math.random() * colorList.length)]
  const color2 = colorList[Math.floor(Math.random() * colorList.length)]
  // const colorDark1 = colorListDark[Math.floor(Math.random() * colorListDark.length)]
  // const colorDark2 = colorListDark[Math.floor(Math.random() * colorListDark.length)]

  return (
    <AppContext.Provider value={{ isConnected, loading, color1, color2 }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}
