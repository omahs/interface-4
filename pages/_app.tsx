import { ThemeProvider } from "next-themes"
import Head from "@components/common/Head"
import { Background, Layout } from "@components/ui"
import "../styles/global/styles.scss"
import { AppWrapper } from "@components/ui/context"
import { CookiesProvider } from "react-cookie"
import { AppProps } from "next/dist/shared/lib/router/router"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head />
      <CookiesProvider>
        <ThemeProvider
          attribute="class"
          storageKey="nightwind-mode"
          defaultTheme="system"
        >
          <AppWrapper>
            <Layout>
              <Background />
              <Component {...pageProps} />
            </Layout>
          </AppWrapper>
        </ThemeProvider>
      </CookiesProvider>
    </>
  )
}

export default MyApp
