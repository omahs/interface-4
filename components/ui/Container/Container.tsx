type Props = {
  size?: string
  children: any
}

const Container = ({ size = "", children }: Props) => {
  return (
    <div className={`${size ? size : "max-w-screen-lg"} mx-auto px-2 md:px-8`}>
      {children}
    </div>
  )
}

export default Container
