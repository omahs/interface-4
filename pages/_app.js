import { ThemeProvider } from "next-themes"
import Head from "@components/common/Head"
import { Background, Container, Layout } from "@components/ui"
import "../styles/global/styles.scss"
import { AppWrapper } from "@components/ui/context"

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head />
      <ThemeProvider
        attribute="class"
        storageKey="nightwind-mode"
        defaultTheme="system"
      >
        <AppWrapper>
          <Layout>
            <Background />
            <Container>
              <Component {...pageProps} />
            </Container>
          </Layout>
        </AppWrapper>
      </ThemeProvider>
    </>
  )
}

export default MyApp
