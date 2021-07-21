import { FC } from "react"
import { Button } from "@components/ui"
import { NextSeo } from "next-seo"

export interface ActionScreenProps {
  text: string
  buttonLabel?: string
  title?: string
  helpText?: string
  href?: string
  onClick?: any
}

const ActionScreen: FC<ActionScreenProps> = ({
  text,
  buttonLabel,
  title,
  helpText,
  href,
  onClick,
}) => {
  return (
    <main className="w-full max-w-screen-sm mx-auto">
      {title && <NextSeo title={title} />}
      <div className="flex flex-col items-center text-center">
        <h3 className="font-semibold mb-7">{text}</h3>
        {helpText && <p className="opacity-70 mb-7">{helpText}</p>}
        {buttonLabel &&
          (href ? (
            <Button label={buttonLabel} href={href} />
          ) : (
            <Button label={buttonLabel} onClick={onClick} />
          ))}
      </div>
    </main>
  )
}

export default ActionScreen
