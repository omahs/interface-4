import { DoubleText, FAQsItem } from ".."
import { faqsMain, faqsNfts, faqsGeneral } from "@lib/content/faqsContent"

const FAQs = () => {
  return (
    <>
      <div className="pt-12 text-center" id="faq">
        <h1 className="pb-8 sm:pb-12">
          <DoubleText inactive logoText="FAQ" size="text-4xl sm:text-5xl" />
        </h1>
        <ul className="max-w-screen-sm pb-16 mx-auto prose text-left">
          {faqsMain.map((faq, key) => (
            <FAQsItem
              key={key}
              question={faq.question}
              answer={faq.answer}
              id={faq.id}
            />
          ))}
        </ul>
        <h2 className="font-bold">NFTs (collectibles)</h2>
        <ul className="max-w-screen-sm pt-6 pb-16 mx-auto prose text-left">
          {faqsNfts.map((faq, key) => (
            <FAQsItem
              key={key}
              question={faq.question}
              answer={faq.answer}
              id={faq.id}
            />
          ))}
        </ul>
        <h2 className="font-bold">General</h2>
        <ul className="max-w-screen-sm pt-6 pb-16 mx-auto prose text-left">
          {faqsGeneral.map((faq, key) => (
            <FAQsItem
              key={key}
              question={faq.question}
              answer={faq.answer}
              id={faq.id}
            />
          ))}
        </ul>
        <p className="text-sm">
          Still have questions? Get in touch on{" "}
          <a
            href="https://discord.gg/CdyHUzdZks"
            target="_blank"
            rel="noreferrer"
            className="highlight"
          >
            Discord
          </a>{" "}
          or any of our socials.
        </p>
      </div>
    </>
  )
}

export default FAQs
