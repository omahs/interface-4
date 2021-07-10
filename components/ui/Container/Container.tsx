type Props = {
  page?: boolean
  size?: string
  children: any
}

const Container = ({ size = "", page = false, children }: Props) => {
  return (
    <div
      className={`${size ? size : "max-w-screen-lg"} mx-auto px-2 md:px-8 ${
        page && "pt-20 pb-10 text-center sm:pt-32"
      }`}
    >
      {children}
    </div>
  )
}

export default Container
