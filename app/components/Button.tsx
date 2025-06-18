type ButtonProps = {
  label: string
  onClick?: () => void
  className?: string
}

export default function Button({ label, onClick, className }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`bg-blue-900 text-white text-xs px-3 py-1 rounded hover:bg-blue-800 transition ${className}`}
    >
      {label}
    </button>
  )
}
