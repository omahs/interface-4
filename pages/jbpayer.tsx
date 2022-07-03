import { Container, DoubleText, JbPayerForm } from "@components/ui"
import { NextSeo } from "next-seo"
import { defaultTitle, domain } from "@components/common/Head"
import Head from "next/head"

export default function Purchases() {
  return (
    <Container page={true} size="max-w-screen-sm">
      <NextSeo
        title="Create JB project payer"
        openGraph={{
          title: `Create JB project payer | ${defaultTitle}`,
          description:
            "Send slicer earnings directly to a JB treasury by deploying a JB payer contract and giving slices to it.",
          url: domain,
          images: [
            {
              url: `${domain}/cover_jbpayer.jpg`,
              width: 1392,
              height: 768,
              alt: `JB payer cover image`
            }
          ]
        }}
      />
      <Head>
        <meta name="twitter:image" content={`${domain}/cover_jbpayer.jpg`} />
      </Head>
      <main className="max-w-[420px] mx-auto sm:max-w-screen-md">
        <DoubleText
          inactive
          logoText="Create JB project payer"
          size="text-4xl sm:text-5xl"
          position="pb-12"
        />
        <div className="space-y-4 text-left">
          <JbPayerForm />
        </div>
      </main>
    </Container>
  )
}
