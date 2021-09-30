import { DoubleText, FAQsItem } from ".."

const faqsContent = [{ question: "What is the love", answer: "Nice" }]

const FAQs = () => {
  return (
    <>
      <div className="py-12 text-center" id="faqs">
        <div className="pb-8 sm:pb-12">
          <DoubleText inactive logoText="FAQs" size="text-4xl sm:text-5xl" />
        </div>
        <div className="max-w-screen-sm mx-auto prose text-left">
          {faqsContent.map((faq, key) => (
            <FAQsItem key={key} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </>
  )
}

export default FAQs
