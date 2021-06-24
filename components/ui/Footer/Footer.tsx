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
        <p className="text-sm">
          Slice series is a{" "}
          <a
            href="https://slice.so"
            className="text-blue-600 hover:text-blue-500 font-medium"
            target="_blank"
            rel="noopener"
          >
            Slice
          </a>{" "}
          service
        </p>
      </Container>
    </footer>
  )
}

export default Footer
