import { Container, Social } from "@components/ui"
import { accounts } from "../Social/Social"

const Footer = () => {
  return (
    <footer className="my-6 text-center">
      <Container>
        <Social wrapperClassName="flex justify-center" accounts={accounts} />
      </Container>
    </footer>
  )
}

export default Footer
