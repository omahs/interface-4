import { DoubleText, FAQsItem } from ".."
import { faqsGeneral, faqsNfts, faqsOther } from "@lib/text/faqsContent"

const FAQs = () => {
  return (
    <>
      <div className="pt-12 text-center" id="faqs">
        <div className="pb-8 sm:pb-12">
          <DoubleText inactive logoText="FAQs" size="text-4xl sm:text-5xl" />
        </div>
        <div className="max-w-screen-sm pb-16 mx-auto prose text-left">
          {faqsGeneral.map((faq, key) => (
            <FAQsItem
              key={key}
              question={faq.question}
              answer={faq.answer}
              id={faq.id}
            />
          ))}
        </div>
        <h2 className="font-bold">NFTs</h2>
        <div className="max-w-screen-sm pt-6 pb-16 mx-auto prose text-left">
          {faqsNfts.map((faq, key) => (
            <FAQsItem
              key={key}
              question={faq.question}
              answer={faq.answer}
              id={faq.id}
            />
          ))}
        </div>
        <h2 className="font-bold">Other</h2>
        <div className="max-w-screen-sm pt-6 pb-16 mx-auto prose text-left">
          {faqsOther.map((faq, key) => (
            <FAQsItem
              key={key}
              question={faq.question}
              answer={faq.answer}
              id={faq.id}
            />
          ))}
        </div>
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
