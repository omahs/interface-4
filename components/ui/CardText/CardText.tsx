type Props = {
  label: string
  isActive: boolean
}

export default function CardText({ label, isActive }: Props) {
  return (
    <div className="flex items-center justify-between px-5 py-4 font-medium text-left transition-colors duration-150 bg-white border-2 border-blue-300 rounded-lg cursor-pointer hover:border-blue-600 shadow-light-focusable">
      <p>{label}</p>
      {isActive && <p>🍰</p>}
    </div>
  )
}
