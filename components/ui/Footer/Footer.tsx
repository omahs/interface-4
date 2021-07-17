import Link from "next/link"
import { Container, Social } from "@components/ui"

const accounts = {
  twitter: "https://twitter.com/slice__so",
  reddit: "https://reddit.com/r/slice",
  discord: "https://reddit.com/r/slice",
  github: "https://reddit.com/r/slice",
}

const Footer = () => {
  return (
    <footer className="my-5 text-center">
      <Container>
        <Social wrapperClassName="flex justify-center" accounts={accounts} />
      </Container>
    </footer>
  )
}

export default Footer
