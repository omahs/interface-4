import { DoubleText } from "@components/ui"

type Props = {
  children: JSX.Element
  title?: string
  inverted?: boolean
  color?: string
  id?: string
}

const Banner = ({
  children,
  title,
  inverted,
  color = "text-white bg-gray-800",
  id,
}: Props) => {
  return (
    <>
      <div className={`relative px-2 py-24 text-center ${color}`} id={id}>
        {title && (
          <div className="pb-8 sm:pb-12">
            <DoubleText
              inactive
              inverted={inverted}
              logoText={title}
              size="text-4xl sm:text-5xl"
              position=""
            />
          </div>
        )}
        {children}
      </div>
    </>
  )
}

export default Banner
