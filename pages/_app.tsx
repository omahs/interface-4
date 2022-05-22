import { ClickToComponent } from "click-to-react-component"
import { Background, Layout } from "@components/ui"
import { AppWrapper } from "@components/ui/context"
import { ThemeProvider } from "next-themes"
import Head from "@components/common/Head"
import { CookiesProvider } from "react-cookie"
import { AppProps } from "next/dist/shared/lib/router/router"
import "../styles/global/styles.scss"

import {
  apiProvider,
  configureChains,
  getDefaultWallets,
  RainbowKitProvider,
  lightTheme,
  midnightTheme
} from "@rainbow-me/rainbowkit"
import { chain, createClient, WagmiProvider } from "wagmi"
import "@rainbow-me/rainbowkit/styles.css"

function MyApp({ Component, pageProps }: AppProps) {
  const { chains, provider } = configureChains(
    [chain.mainnet, chain.rinkeby],
    [apiProvider.alchemy(process.env.ALCHEMY_ID), apiProvider.fallback()]
  )

  const { connectors } = getDefaultWallets({
    appName: "Slice",
    chains
  })

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
  })

  return (
    <>
      <ClickToComponent />
      <Head />
      <CookiesProvider>
        <ThemeProvider
          attribute="class"
          storageKey="nightwind-mode"
          defaultTheme="system"
        >
          <WagmiProvider client={wagmiClient}>
            <RainbowKitProvider
              chains={chains}
              theme={
                // isDark
                //   ? midnightTheme({
                //       accentColor: "#2563eb",
                //       accentColorForeground: "white",
                //       borderRadius: "medium"
                //     })
                //   :
                lightTheme({
                  accentColor: "#2563eb",
                  accentColorForeground: "white",
                  borderRadius: "medium"
                })
              }
              showRecentTransactions={true}
              coolMode
            >
              <AppWrapper>
                <Layout>
                  <Background />
                  <Component {...pageProps} />
                </Layout>
              </AppWrapper>
            </RainbowKitProvider>
          </WagmiProvider>
        </ThemeProvider>
      </CookiesProvider>
    </>
  )
}

export default MyApp

// TODO: Add dark mode to rainbowKit
