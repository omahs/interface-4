import useProvider from "@lib/useProvider"
import { createContext, useContext, useEffect, useState } from "react"
import { colorList, darkColorList } from "@utils/colorList"
import { View } from "@lib/text/modals"
import client from "@utils/apollo-client"
import { gql } from "@apollo/client"

export type Purchase = {
  slicerId: string
  productId: string
  quantity: string
}

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
  purchases: [],
})

export function AppWrapper({ children }) {
  const [loading, setLoading] = useState(true)
  const [modalView, setModalView] = useState<View>({ name: "" })
  const { isConnected, chainId, account } = useProvider(setLoading)

  const [color1, setColor1] = useState([])
  const [color2, setColor2] = useState([])
  const [darkColor1, setDarkColor1] = useState([])
  const [darkColor2, setDarkColor2] = useState([])
  const [purchases, setPurchases] = useState<Purchase[]>([])

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

  const getPurchases = async (buyer: string) => {
    const tokensQuery = /* GraphQL */ `
        payee (id: "${buyer.toLowerCase()}") {
        purchases {
          id
          quantity
        }
      }`

    const { data } = await client.query({
      query: gql`
        query {
          ${tokensQuery}
        }
      `,
    })
    const payeePurchases = data?.payee?.purchases
    let purchasesList: Purchase[] = []
    payeePurchases.map((p) => {
      const id = p.id.split("-")
      const slicerId = id[0]
      const productId = id[1]
      purchasesList.push({ slicerId, productId, quantity: p.quantity })
    })
    setPurchases(purchasesList)
  }

  useEffect(() => {
    shuffleColors()
  }, [])

  useEffect(() => {
    if (account) {
      getPurchases(account)
    }
  }, [account])

  // Todo:

  // useEffect(() => {
  //   if (purchases && cookies) {
  //     // Remove from cart products which have already been purchased & are not multiple
  //   }
  // }, [purchases, cookies])

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
        purchases,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}
