type Props = {
  label: string
  isActive: boolean
}

export default function CardText({ label, isActive }: Props) {
  return (
    <div
      className={`px-5 py-4 font-medium text-left transition-colors duration-150 border-2 rounded-lg cursor-pointer shadow-light-focusable ${
        isActive
          ? "bg-blue-600 text-white"
          : "bg-white border-blue-300 hover:border-blue-600"
      }`}
    >
      <p>{label}</p>
    </div>
  )
}
