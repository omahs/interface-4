import { ThemeProvider } from "next-themes"
import Head from "@components/common/Head"
import { Background, Container, Layout } from "@components/ui"
import "../styles/global/styles.scss"

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head />
      <ThemeProvider
        attribute="class"
        storageKey="nightwind-mode"
        defaultTheme="system"
      >
        <Layout>
          <Background />
          <Container>
            <Component {...pageProps} />
          </Container>
        </Layout>
      </ThemeProvider>
    </>
  )
}

export default MyApp
