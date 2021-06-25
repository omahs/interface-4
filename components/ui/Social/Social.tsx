import s from "./Social.module.css"
import { FC } from "react"
import {
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Github,
  Discord,
} from "@components/icons/Social"

type Props = {
  accounts: object
  className?: string
  wrapperClassName?: string
}

const Social: FC<Props> = ({ wrapperClassName, accounts }, props) => {
  const { children, className, ...rest } = props
  const rootClassName = `${wrapperClassName} ${s.root}`

  const components = {
    twitter: { color: "hover:text-blue-500", element: Twitter },
    facebook: { color: "hover:text-blue-700", element: Facebook },
    instagram: { color: "hover:text-pink-500", element: Instagram },
    linkedin: { color: "hover:text-blue-700", element: Linkedin },
    mail: { color: "hover:text-gray-500", element: Mail },
    github: { color: "hover:text-gray-700", element: Github },
    discord: { color: "hover:text-gray-700", element: Discord },
  }

  const size = "h-6"

  return (
    <div className={`${rootClassName}`}>
      {Object.keys(accounts).map((key) => {
        const DynamicComponent = components[key].element
        const componentColor = components[key].color
        return (
          <a
            key={key}
            className={`${componentColor} ${size} ${s.social}`}
            href={accounts[key]}
            target="_blank"
            rel="noreferrer"
          >
            <DynamicComponent />
          </a>
        )
      })}
    </div>
  )
}

export default Social
