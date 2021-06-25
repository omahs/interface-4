import Link from "next/link"
import { Container, Social } from "@components/ui"

const accounts = {
  twitter: "https://twitter.com/slice__so",
}

const Footer = () => {
  return (
    <footer className="my-5 text-center">
      <Container>
        <Social
          wrapperClassName="flex justify-center mb-3 md:pl-7"
          accounts={accounts}
        />
      </Container>
    </footer>
  )
}

export default Footer
