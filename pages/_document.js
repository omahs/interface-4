import Document, { Html, Head, Main, NextScript } from "next/document"
import Script from "next/script"
import Image from "next/image"

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700;800&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script async defer src="https://sa.slice.so/latest.js"></script>
          <noscript>
            <img
              src="https://sa.slice.so/noscript.gif"
              alt=""
              referrerPolicy="no-referrer-when-downgrade"
            />
          </noscript>
        </body>
      </Html>
    )
  }
}

export default MyDocument
