import useProvider from "@lib/useProvider"
import { createContext, useContext, useState } from "react"

const AppContext = createContext({ isConnected: false, loading: true })

export function AppWrapper({ children }) {
  const [loading, setLoading] = useState(true)
  const isConnected = useProvider(setLoading)

  return (
    <AppContext.Provider value={{ isConnected, loading }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}
